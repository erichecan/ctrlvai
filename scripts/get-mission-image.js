const axios = require('axios');

const PEXELS_API_KEY = '8UHM3E2dD6SdVlEdPAoXSvH1TpyBOJcClZsybQZLsdj1mB4T7XK78xfb';

async function searchMissionImage() {
    const query = 'business goals vision';
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=5`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': PEXELS_API_KEY
            }
        });

        if (response.data.photos && response.data.photos.length > 1) {
            const imageUrl = response.data.photos[1].src.original;
            console.log(imageUrl);
        } else if (response.data.photos && response.data.photos.length > 0) {
            const imageUrl = response.data.photos[0].src.original;
            console.log('Only one image found, using the first one:', imageUrl);
        } else {
            console.log('No mission image found on Pexels.');
        }

    } catch (error) {
        console.error('Error searching for mission image:', error.message);
    }
}

searchMissionImage(); 