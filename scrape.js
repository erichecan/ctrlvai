import { chromium } from 'playwright';
import fs from 'fs/promises';

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

  page.on('pageerror', error => {
    console.error(`PAGE ERROR: ${error.message}`);
    consoleMessages.push(`PAGE ERROR: ${error.message}`);
  });

  try {
    console.log('Navigating to http://localhost:3000/admin/tools...');
    await page.goto('http://localhost:3000/admin/tools', { waitUntil: 'networkidle' });

    console.log('Page loaded. Attempting to delete a tool...');

    // Find the delete button for the specific tool by locating the row first
    const toolName = 'ABC'; // Targeting the 'ABC' tool for deletion test
    
    // Locate the row containing the tool name and then the delete button within that row
    const deleteButton = page.locator('tr', { hasText: toolName }).locator('button[aria-label="delete"]');

    // Wait for the delete button to be visible and enabled
    await deleteButton.waitFor({ state: 'visible', timeout: 10000 }); // Reduced timeout slightly for quicker feedback
    await deleteButton.waitFor({ state: 'enabled', timeout: 10000 });

    console.log(`Found delete button for \'${toolName}\'. Clicking...`);
    await deleteButton.click();

    // Wait for the Ant Design confirmation modal to appear
    const confirmModalButtonSelector = "//button[span[text()='Yes, Delete']]";
    await page.waitForSelector(confirmModalButtonSelector, { timeout: 10000 });

    console.log('Confirmation modal appeared. Clicking \'Yes, Delete\'... ');
    await page.click(confirmModalButtonSelector);

    // Wait for a moment to allow the action to process and potential messages to appear
    // Or ideally, wait for a success message or for the row to disappear
    await new Promise(resolve => setTimeout(resolve, 5000)); // Increased wait time slightly

    console.log('Delete action triggered. Capturing console output...');

  } catch (error) {
    console.error('Error during Playwright execution:', error);
    consoleMessages.push(`PLAYWRIGHT ERROR: ${error.message}`);
  } finally {
    await browser.close();

    console.log('\n--- Captured Console Messages (including errors) --- ');
    // consoleMessages.forEach(msg => console.log(msg)); // Already logged in real-time
    console.log('----------------------------------------------------');
  }
})(); 