// getDailyEmissions.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api/emissions';
const STORE_ID_TO_FETCH = 'WM1001'; // Change this to any storeId you want to check

async function getDailyEmissions(storeId) {
    try {
        console.log(`Fetching daily emissions for store: ${storeId}...`);
        const response = await axios.get(`${API_BASE_URL}/daily/${storeId}`);
        console.log(`\n--- Daily Emissions for ${storeId} ---`);
        console.log(JSON.stringify(response.data, null, 2));
        console.log("---------------------------------------");
    } catch (error) {
        if (error.response) {
            console.error(`Error fetching data: ${error.response.status} - ${error.response.data.msg || error.response.data}`);
        } else {
            console.error(`Error fetching data: ${error.message}`);
        }
    }
}

// Run the function
getDailyEmissions(STORE_ID_TO_FETCH);

// You could also set an interval to fetch data periodically, similar to the simulator
// setInterval(() => getDailyEmissions(STORE_ID_TO_FETCH), 30000); // Every 30 seconds