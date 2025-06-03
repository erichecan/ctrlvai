const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const baseUrl = 'https://toolify.ai';
const categoryUrl = `${baseUrl}/category/image-generation-editing`;

async function scrapeTools() {
    try {
        console.log(`Fetching category page: ${categoryUrl}`);
        const { data } = await axios.get(categoryUrl);
        const $ = cheerio.load(data);

        const tools = [];

        // Selector for tool listings - Based on previous HTML snippet
        const toolItems = $('.tools.grid .tool-item');

        console.log(`Found ${toolItems.length} tool items on the category page.`);

        for (let i = 0; i < toolItems.length; i++) {
            const element = toolItems[i];
            try {
                // Extract info from listing page
                const name = $(element).find('.tool-name').text().trim();
                const description = $(element).find('.tool-desc').text().trim();
                const relativeUrl = $(element).find('a.go-tool-detail-pic').attr('href');
                const websiteUrl = relativeUrl ? `${baseUrl}${relativeUrl}` : null; // Construct full URL
                const logoUrl = $(element).find('.tool-pic img').attr('src');
                const category = 'Image Generation & Editing'; // Explicitly set category
                const pricing = $(element).find('.free-tag span').text().trim() || 'Unknown'; // Check for 'Free' tag

                if (name && websiteUrl) {
                    console.log(`Processing tool: ${name}`);

                    // Scrape detail page for Features and Tags
                    let features = [];
                    let tags = [];

                    try {
                        console.log(`  Fetching detail page: ${websiteUrl}`);
                        const detailPageResponse = await axios.get(websiteUrl);
                        const $$ = cheerio.load(detailPageResponse.data);

                        // TODO: Identify accurate selectors for Features and Tags on the detail page
                        // These are placeholders; you will need to inspect a tool detail page's HTML.

                        // Example placeholder selectors (likely incorrect): 
                        $$('.features-list li').each((j, el) => {
                            features.push($$(el).text().trim());
                        });

                        $$('.tags-list .tag').each((j, el) => {
                            tags.push($$(el).text().trim());
                        });

                        console.log(`  Found ${features.length} features and ${tags.length} tags.`);

                    } catch (detailError) {
                        console.error(`  Error fetching or parsing detail page for ${name}:`, detailError.message);
                        // Continue even if detail page scraping fails
                    }

                    tools.push({
                        id: websiteUrl.split('/').pop(), // Use handle from URL as a simple ID
                        name,
                        description,
                        websiteUrl,
                        logo: logoUrl, // Rename logoUrl to logo to match tools.json structure
                        isPaid: pricing !== 'Free', // Simple logic based on 'Free' tag
                        features,
                        tags,
                        category,
                    });

                    // Add a small delay to avoid overwhelming the server
                    await new Promise(resolve => setTimeout(resolve, 1000));

                } else {
                    console.warn(`Skipping tool item due to missing name or URL:`, $(element).html());
                }

            } catch (itemError) {
                console.error(`Error processing tool item index ${i}:`, itemError.message);
            }
        }

        console.log(`Finished scraping. Total tools collected: ${tools.length}.`);
        // You can save the data to a JSON file
        fs.writeFileSync('scraped_tools_full.json', JSON.stringify(tools, null, 2));
        console.log('Scraped data saved to scraped_tools_full.json');

    } catch (error) {
        console.error('Error scraping category page:', error.message);
    }
}

scrapeTools(); 