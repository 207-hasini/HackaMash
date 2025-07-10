const axios = require('axios');

// --- Emission Factors (Real-world values) ---
const EF_ELECTRICITY = 0.417; // kg CO₂e per kWh
const EF_DIESEL = 2.68;       // kg CO₂e per liter
const GWP_HFC = 1430;         // Global Warming Potential of R-134a refrigerant (1430x more potent than CO₂)

const STORES = ['WM1001', 'WM1002', 'WM1003', 'WM1004'];
const API_URL = 'http://localhost:5000/api/emissions'; // Your backend server URL

// Function to generate and send data for one store
async function simulateAndSendData(storeId) {
  try {
    // 1. Generate random raw data
    const energy_kwh = Math.random() * (500 - 100) + 100; // Random kWh between 100 and 500
    const fuel_liters = Math.random() * (50 - 10) + 10;   // Random liters between 10 and 50
    const refrigerant_leaks_kg = Math.random() * 0.1;     // Simulate a small leak (0 to 0.1 kg)

    // 2. Calculate CO₂ emissions
    const emissions_from_energy = energy_kwh * EF_ELECTRICITY;
    const emissions_from_fuel = fuel_liters * EF_DIESEL;
    const emissions_from_refrigerant = refrigerant_leaks_kg * GWP_HFC;
    const total_emissions = emissions_from_energy + emissions_from_fuel + emissions_from_refrigerant;

    // 3. Prepare the data payload
    const dataPayload = {
      storeId: storeId,
      co2_emissions: parseFloat(total_emissions.toFixed(2)),
      breakdown: {
        energy_kwh: parseFloat(energy_kwh.toFixed(2)),
        fuel_liters: parseFloat(fuel_liters.toFixed(2)),
        refrigerant_leaks_kg: parseFloat(refrigerant_leaks_kg.toFixed(5))
      },
      timestamp: new Date().toISOString()
    };

    // 4. Send data to the backend API
    await axios.post(API_URL, dataPayload);
    console.log(`Successfully sent data for store ${storeId}: ${total_emissions.toFixed(2)} kg CO₂e`);
  } catch (error) {
    console.error(`Error sending data for ${storeId}:`, error.message);
  }
}

// Run the simulation every 10 seconds for all stores
console.log("Starting emissions simulator...");
setInterval(() => {
  console.log("\n--- New simulation cycle ---");
  STORES.forEach(store => simulateAndSendData(store));
}, 10000);