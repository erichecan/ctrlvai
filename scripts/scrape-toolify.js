import { chromium } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';

async function scrapeToolify() {
  // 启动浏览器
  const browser = await chromium.launch({ headless: false }); // 设置 headless: false 以便于调试
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 访问网站
    await page.goto('https://toolify.ai/');
    
    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 获取所有工具信息
    const tools = await page.evaluate(() => {
      const toolElements = document.querySelectorAll('.tool-card, .tool-item'); // 根据实际页面结构调整选择器
      const toolsData = [];

      toolElements.forEach(element => {
        const title = element.querySelector('h2, h3')?.textContent?.trim() || '';
        const description = element.querySelector('p')?.textContent?.trim() || '';
        const link = element.querySelector('a')?.href || '';
        const imageUrl = element.querySelector('img')?.src || '';

        toolsData.push({
          title,
          description,
          link,
          imageUrl
        });
      });

      return toolsData;
    });

    // 创建 Markdown 内容
    let markdownContent = '# Toolify.ai Tools\n\n';
    tools.forEach(tool => {
      markdownContent += `## ${tool.title}\n\n`;
      markdownContent += `${tool.description}\n\n`;
      markdownContent += `- Link: ${tool.link}\n`;
      markdownContent += `- Image: ${tool.imageUrl}\n\n`;
      markdownContent += '---\n\n';
    });

    // 保存为 Markdown 文件
    await fs.writeFile(
      path.join(process.cwd(), 'scripts', 'toolify-tools.md'),
      markdownContent,
      'utf-8'
    );

    console.log('Successfully scraped and saved tools data to Markdown!');

  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    // 关闭浏览器
    await browser.close();
  }
}

// 运行脚本
scrapeToolify();