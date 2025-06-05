import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Array to store console messages
  const consoleMessages = [];

  // Listen for console messages
  page.on('console', msg => {
    consoleMessages.push(msg.text());
    console.log(`PAGE CONSOLE: ${msg.text()}`); // Also log in real-time
  });

  try {
    console.log('Navigating to http://localhost:3000/tools...');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle' });

    // Optional: Wait for a specific element to ensure content is loaded
    // await page.waitForSelector('input[placeholder="Search tools..."]');

    console.log('Page loaded. Capturing console output...');
    // Give a moment for potential late logs, though networkidle should help
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    
    // Get the full HTML structure
    const htmlContent = await page.content();
    fs.writeFileSync('toolify_structure.html', htmlContent);
    console.log('HTML structure saved to toolify_structure.html');
    
    // Get visible text content with more specific selectors
    const content = await page.evaluate(() => {
      // Helper function to clean text
      const cleanText = (text) => text.trim().replace(/\s+/g, ' ');
      
      // Get main categories (using more specific selectors)
      const categories = Array.from(document.querySelectorAll('nav a, .category-link, [class*="category"]'))
        .map(el => cleanText(el.textContent))
        .filter(text => text.length > 0 && text !== 'More')
        .filter((text, index, self) => self.indexOf(text) === index); // Remove duplicates
      
      // Get featured tools (using more specific selectors)
      const featuredTools = Array.from(document.querySelectorAll('.tool-card, .featured-tool, [class*="tool-item"]'))
        .map(el => {
          const name = el.querySelector('h3, .tool-name, [class*="name"]')?.textContent || '';
          const description = el.querySelector('p, .tool-description, [class*="description"]')?.textContent || '';
          const isFree = el.querySelector('.free-tag, [class*="free"]')?.textContent.includes('Free') || false;
          
          return {
            name: cleanText(name),
            description: cleanText(description),
            isFree
          };
        })
        .filter(tool => tool.name && tool.description)
        .filter((tool, index, self) => 
          self.findIndex(t => t.name === tool.name) === index
        ); // Remove duplicates based on name
      
      // Get main content sections
      const mainContent = Array.from(document.querySelectorAll('main, .main-content, [role="main"]'))
        .map(el => {
          const title = el.querySelector('h1, h2')?.textContent || '';
          const text = el.textContent;
          return {
            title: cleanText(title),
            content: cleanText(text)
          };
        })
        .filter(section => section.title && section.content);
      
      return {
        categories,
        featuredTools,
        mainContent,
        fullText: cleanText(document.body.innerText)
      };
    });
    
    // Save the structured content to a JSON file
    fs.writeFileSync('toolify_content.json', JSON.stringify(content, null, 2));
    console.log('Content saved to toolify_content.json');
    
    // Also save the full text to a markdown file
    fs.writeFileSync('toolify_content.md', content.fullText);
    console.log('Full text saved to toolify_content.md');
    
  } catch (error) {
    console.error('Error during page navigation or capture:', error);
  } finally {
    await browser.close();

    console.log('\n--- Captured Console Messages --- ');
    // consoleMessages.forEach(msg => console.log(msg)); // Already logged in real-time
    console.log('-----------------------------------');
  }
})(); 