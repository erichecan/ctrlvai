import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOOLS_DATA_PATH = path.join(__dirname, 'public/data/tools.json');

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
    await fs.writeFile(TOOLS_DATA_PATH, JSON.stringify(data, null, 2));
    console.log('Updated tools data written to tools.json');
  } catch (error) {
    console.error('Error writing local tools.json:', error);
  }
}

async function runScrape() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Array to store console messages
  const consoleMessages = [];

  // Listen for console messages
  page.on('console', (msg) => {
    console.log(`Browser console: ${msg.text()}`);
  });

  page.on('pageerror', error => {
    console.error(`PAGE ERROR: ${error.message}`);
  });

  try {
    console.log('Navigating to http://toolify.ai');
    // Increase timeout for page load
    await page.goto('http://toolify.ai', { waitUntil: 'networkidle', timeout: 60000 });
    console.log('Page loaded. Attempting to scrape tools...');

    // Scrape tool names and logo URLs from the page
    const scrapedTools = await page.evaluate(() => {
      const results = [];
      // *** Adjust these selectors based on toolify.ai's actual HTML structure ***
      const toolItems = document.querySelectorAll('.resource-card'); // Example selector for each tool item

      toolItems.forEach(item => {
        const nameElement = item.querySelector('h3 a'); // Example selector for tool name link
        const logoElement = item.querySelector('img'); // Example selector for logo image

        const name = nameElement ? nameElement.innerText.trim() : null;
        const logo = logoElement ? logoElement.getAttribute('src') : null;

        if (name && logo) {
          results.push({ name, logo });
        }
      });

      return results;
    });

    console.log(`Scraped ${scrapedTools.length} tools from toolify.ai.`);

    // Read local tools data
    const localToolsData = await readLocalTools();

    // Update local tools data with scraped logos
    let updatedCount = 0;
    scrapedTools.forEach(scrapedTool => {
      // Simple name matching (case-insensitive, trimmed)
      const matchedTool = localToolsData.tools.find(localTool =>
        localTool.name.trim().toLowerCase() === scrapedTool.name.trim().toLowerCase()
      );

      if (matchedTool && !matchedTool.logo) { // Only update if a match is found and local logo is missing
        matchedTool.logo = scrapedTool.logo;
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      console.log(`Updated ${updatedCount} tool logos in local data.`);
      // Write updated data back to the file
      await writeLocalTools(localToolsData);
    } else {
      console.log('No tool logos updated in local data.');
    }

  } catch (error) {
    console.error('An error occurred during scraping or updating:', error);
  } finally {
    await browser.close();
    console.log('Scraping and update process finished.');
  }
}

runScrape(); 