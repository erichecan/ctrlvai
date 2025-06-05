import { chromium } from 'playwright';
import fs from 'fs/promises';

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
    console.log('Navigating to http://localhost:3000/tools');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle' });
    console.log('Page loaded.');

    // You can add more interactions here if needed, e.g., clicking filters
    // await page.click('...');
    // await page.waitForTimeout(2000); // wait for content to load after interaction

    const scrapedContent = await page.evaluate(() => {
      // Helper function to clean text
      const cleanText = (text) => text ? text.trim().replace(/\s+/g, ' ') : '';

      // *** Refined Selectors based on common listing patterns ***
      // Look for container elements that likely wrap each tool's information
      const toolContainers = document.querySelectorAll(
        '.tool-card, .featured-tool, [class*="tool-item"], [class*="tool-box"], .ai-tool-item, .tool-listing'
      );

      const featuredTools = Array.from(toolContainers)
        .map(container => {
          try {
            // *** Extract data within each container ***
            const nameElement = container.querySelector('h3, .tool-name, [class*="name"]');
            const descriptionElement = container.querySelector('p, .tool-description, [class*="description"]');
            const linkElement = container.querySelector('a[href]');
            const priceElement = container.querySelector('.paid-tag, .free-tag, [class*="price"]');

            const name = cleanText(nameElement?.textContent);
            const description = cleanText(descriptionElement?.textContent);
            const url = linkElement?.href || '';
            const isPaid = priceElement ? priceElement.textContent?.includes('Paid') : null; // Use null if uncertain

            // Basic validation: require at least a name and URL
            if (!name || !url || url === '#') return null; // Skip if missing essential info or dummy link

            return {
              name: name,
              description: description,
              url: url,
              isPaid: isPaid,
              // Placeholder for other properties expected by AITool interface
              logo: '', // No logo in this scrape
              features: [], // No features in this scrape
              tags: [], // No tags in this scrape
              category: 'Uncategorized', // Default category
            };
          } catch (e) {
            console.error('Error processing tool container:', container, e);
            return null;
          }
        })
        .filter(tool => tool !== null); // Filter out any null entries resulting from errors or validation

      // You might also want to extract categories or other page info here

      return {
        featuredTools: featuredTools,
        // Include other data like categories, main content text if needed
        // categories: [...],
        // mainContent: [...],
        // fullText: cleanText(document.body.innerText)
      };
    });

    console.log(`Scraped ${scrapedContent.featuredTools.length} tools.`);

    // Save the structured content to toolify_content.json
    await fs.writeFile('toolify_content.json', JSON.stringify(scrapedContent, null, 2));
    console.log('Scraped data saved to toolify_content.json');

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

runScrape(); 