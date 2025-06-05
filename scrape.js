import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DATA_PATH = path.join(__dirname, 'public/data/tools.json');
const LOGOS_DIR = path.join(__dirname, 'public/images/logos');
const TOOLIFY_URL = 'https://toolify.ai';
const SCRAPED_DATA_PATH = path.join(__dirname, 'toolify_content.json');

// 确保 logos 目录存在
async function ensureLogosDir() {
  try {
    await fs.access(LOGOS_DIR);
  } catch {
    await fs.mkdir(LOGOS_DIR, { recursive: true });
    console.log('Created logos directory:', LOGOS_DIR);
  }
}

// 下载图片到本地
async function downloadImage(url, toolName) {
  return new Promise((resolve, reject) => {
    // 清理文件名,只保留字母数字和连字符
    const cleanName = toolName.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase();
    const filePath = path.join(LOGOS_DIR, `${cleanName}.png`);
    
    // 如果文件已存在,直接返回路径
    fs.access(filePath)
      .then(() => {
        console.log(`Logo already exists for ${toolName}`);
        resolve(`/images/logos/${cleanName}.png`);
      })
      .catch(() => {
        // 下载图片
        https.get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`Failed to download image: ${response.statusCode}`));
            return;
          }

          const fileStream = createWriteStream(filePath);
          response.pipe(fileStream);

          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Downloaded logo for ${toolName}`);
            resolve(`/images/logos/${cleanName}.png`);
          });

          fileStream.on('error', (err) => {
            fs.unlink(filePath, () => {}); // 删除不完整的文件
            reject(err);
          });
        }).on('error', reject);
      });
  });
}

// Helper to read local tools data
async function readLocalTools() {
  try {
    const data = await fs.readFile(TOOLS_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading local tools.json:', error);
    return { tools: [] };
  }
}

// Helper to write local tools data
async function writeLocalTools(data) {
  try {
    // 先备份当前文件
    const backupPath = TOOLS_DATA_PATH + '.bak';
    await fs.copyFile(TOOLS_DATA_PATH, backupPath);
    console.log('Created backup at:', backupPath);
    
    // 写入新数据
    await fs.writeFile(TOOLS_DATA_PATH, JSON.stringify(data, null, 2));
    console.log('Updated tools data written to tools.json');
  } catch (error) {
    console.error('Error writing local tools.json:', error);
  }
}

// Helper to read scraped toolify data
async function readScrapedTools() {
  try {
    const data = await fs.readFile(SCRAPED_DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading toolify_content.json:', error);
    return { featuredTools: [] }; // Return empty array if file doesn't exist or is empty
  }
}

// Function to integrate scraped data into local tools data
async function integrateScrapedData() {
  console.log('Starting data integration...');
  const localToolsData = await readLocalTools();
  const scrapedData = await readScrapedTools();

  if (!scrapedData || !scrapedData.featuredTools || scrapedData.featuredTools.length === 0) {
    console.log('No scraped data found to integrate.');
    return;
  }

  const existingToolNames = new Set(localToolsData.tools.map(tool => tool.name.toLowerCase()));
  const toolsToAdd = [];

  for (const scrapedTool of scrapedData.featuredTools) {
    if (!scrapedTool.name || existingToolNames.has(scrapedTool.name.toLowerCase())) {
      console.log(`Skipping duplicate or unnamed tool: ${scrapedTool.name || 'Unnamed'}`);
      continue;
    }

    // Format scraped data to match local tools structure
    const newTool = {
      id: `tool_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: scrapedTool.name,
      description: scrapedTool.description || '',
      logo: scrapedTool.logoUrl || '',  // Use the scraped logo URL directly
      url: scrapedTool.url || '',       // Include the scraped URL
      isPaid: false,
      features: [],
      tags: [],
      category: scrapedTool.category || 'Uncategorized'
    };

    toolsToAdd.push(newTool);
    existingToolNames.add(newTool.name.toLowerCase());
  }

  if (toolsToAdd.length > 0) {
    console.log(`Integrating ${toolsToAdd.length} new tools from scraped data.`);
    localToolsData.tools.push(...toolsToAdd);
    await writeLocalTools(localToolsData);
    console.log('Data integration complete.');
  } else {
    console.log('No new unique tools found in scraped data to integrate.');
  }
}

async function scrapeLogos() {
  // 确保 logos 目录存在
  await ensureLogosDir();
  
  const browser = await chromium.launch({ headless: false }); // 设置为 false 以便调试
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // 读取本地工具数据
    const localToolsData = await readLocalTools();
    console.log(`Found ${localToolsData.tools.length} tools in local data`);

    // 访问 toolify.ai
    console.log('Navigating to toolify.ai...');
    await page.goto(TOOLIFY_URL, { waitUntil: 'networkidle' });
    
    // 直接查找所有带有真实 logo URL 的图片
    const logoImages = await page.$$('img.el-image__inner[src*="cdn-images.toolify.ai"]');
    console.log(`Found ${logoImages.length} potential logo images with cdn-images.toolify.ai`);

    for (const logoImg of logoImages) {
      try {
        const toolInfo = await logoImg.evaluate(el => {
          const logoUrl = el.src;
          // 向上查找父元素，直到找到工具卡片或包含名称的元素
          let currentElement = el;
          let name = null;
          while (currentElement && !name) {
            const nameEl = currentElement.querySelector('.tool-name span, .tool-name a, h3 a, h2 a');
            if (nameEl) {
              name = nameEl.textContent ? nameEl.textContent.trim() : null;
              break;
            }
            currentElement = currentElement.parentElement;
          }
          
          return {
            name: name,
            logoUrl: logoUrl
          };
        });

        if (!toolInfo.name || !toolInfo.logoUrl) {
          console.log('Skipping potential logo - missing name or logo:', toolInfo);
          continue;
        }
        
        console.log(`Found potential tool: ${toolInfo.name} with logo: ${toolInfo.logoUrl}`);

        // 在本地数据中查找匹配的工具
        const matchedTool = localToolsData.tools.find(tool => 
          tool.name.toLowerCase() === toolInfo.name.toLowerCase()
        );

        if (matchedTool && (!matchedTool.logo || !matchedTool.logo.startsWith('/images/logos/'))) {
          console.log(`Found match for ${toolInfo.name}`);
          try {
            // 下载 logo
            const localPath = await downloadImage(toolInfo.logoUrl, toolInfo.name);
            matchedTool.logo = localPath;
            console.log(`Updated logo for ${toolInfo.name}`);
            
            // 每更新 5 个工具就保存一次
            const updatedCount = localToolsData.tools.filter(t => t.logo && t.logo.startsWith('/images/logos/')).length;
            if (updatedCount > 0 && updatedCount % 5 === 0) {
              await writeLocalTools(localToolsData);
            }
          } catch (error) {
            console.error(`Error downloading logo for ${toolInfo.name}:`, error.message);
          }
        } else if (matchedTool && matchedTool.logo && matchedTool.logo.startsWith('/images/logos/')) {
             console.log(`Skipping ${toolInfo.name} - already has local logo`);
        } else {
             console.log(`No match found for ${toolInfo.name} in local data`);
        }
      } catch (error) {
        console.error('Error processing potential logo image:', error.message);
        continue;
      }
    }

    // 最后保存所有更新
    await writeLocalTools(localToolsData);
    console.log('Logo scraping completed');

  } catch (error) {
    console.error('An error occurred during scraping:', error);
  } finally {
    await browser.close();
  }
}

// Function to scrape tool list from toolify.ai
async function scrapeToolList() {
  console.log('Starting to scrape tool list from toolify.ai...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    await page.goto(TOOLIFY_URL, { waitUntil: 'networkidle' });
    console.log('Page loaded, searching for tools...');

    // Wait for tool cards to load
    await page.waitForSelector('.tool-card, .tool-item, [class*="tool-"]', { timeout: 10000 });

    // Extract tool information from the page
    const tools = await page.evaluate(() => {
      // Try different selectors to find tool cards
      const toolElements = document.querySelectorAll('.tool-card, .tool-item, [class*="tool-"], .el-card');
      console.log(`Found ${toolElements.length} tool elements`);
      
      return Array.from(toolElements).map(tool => {
        // Try multiple selectors for the name
        const nameSelectors = [
          '.tool-name span', '.tool-name a', 'h3 a', 'h2 a', '.name',
          '.el-card__header a', '.card-title a', '[class*="title"] a',
          'a[href*="/tool/"]', 'a[href*="toolify.ai"]'
        ];
        
        let name = '';
        let url = '';
        
        // First try to find a link that contains both name and URL
        for (const selector of nameSelectors) {
          const element = tool.querySelector(selector);
          if (element) {
            name = element.textContent.trim();
            if (element.tagName === 'A' && element.href) {
              url = element.href;
              break;
            }
          }
        }
        
        // If we found a name but no URL, look for any link in the card
        if (name && !url) {
          const linkElement = tool.querySelector('a[href*="/tool/"], a[href*="toolify.ai"]');
          if (linkElement) {
            url = linkElement.href;
          }
        }

        // Try to find the description
        const descSelectors = [
          '.description', '.tool-description', 'p',
          '.el-card__body p', '.card-description',
          '[class*="description"]', '[class*="desc"]'
        ];
        let description = '';
        for (const selector of descSelectors) {
          const element = tool.querySelector(selector);
          if (element) {
            description = element.textContent.trim();
            if (description) break;
          }
        }

        // Try to find the category
        const categorySelectors = [
          '.category', '.tool-category', '.tag',
          '.el-tag', '[class*="category"]', '[class*="tag"]'
        ];
        let category = 'Uncategorized';
        for (const selector of categorySelectors) {
          const element = tool.querySelector(selector);
          if (element) {
            category = element.textContent.trim();
            if (category) break;
          }
        }

        // Try to find the logo URL
        const logoElement = tool.querySelector('img[src*="cdn-images.toolify.ai"]');
        const logoUrl = logoElement ? logoElement.src : '';

        // Only return tools that have at least a name
        if (name) {
          return {
            name,
            url: url || '',  // Ensure URL is at least an empty string
            description: description || '',
            category: category || 'Uncategorized',
            logoUrl: logoUrl || ''
          };
        }
        return null;
      }).filter(tool => tool !== null); // Remove any null entries
    });

    console.log(`Found ${tools.length} tools on the page`);

    // Save the scraped data
    const scrapedData = {
      featuredTools: tools,
      scrapedAt: new Date().toISOString()
    };

    await fs.writeFile(SCRAPED_DATA_PATH, JSON.stringify(scrapedData, null, 2));
    console.log('Saved scraped tool data to toolify_content.json');

  } catch (error) {
    console.error('Error scraping tool list:', error);
  } finally {
    await browser.close();
  }
}

// Modify the runScrapeAndIntegrate function to include scraping the tool list
async function runScrapeAndIntegrate() {
    console.log('Starting the complete scraping and integration process...');
    
    // First, scrape the tool list and save it to toolify_content.json
    await scrapeToolList();
    
    // Then run the logo scraping (which will use the newly scraped data)
    await scrapeLogos();
    
    // Finally, integrate the scraped data into tools.json
    await integrateScrapedData();
    
    console.log('Complete scraping and integration process finished.');
}

// Run the combined function
runScrapeAndIntegrate(); 