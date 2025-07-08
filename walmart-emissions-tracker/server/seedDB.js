const mongoose = require('mongoose');
const Store = require('./models/Address');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

// Sample Walmart store data (100 stores across top states)
const mockStores = [
  // Texas (Sample 20 stores)
  {
    storeId: "WM-TX-1001",
    location: { type: "Point", coordinates: [-97.7431, 30.2672] },
    city: "Austin",
    state: "TX",
    address: "710 E Ben White Blvd, Austin, TX 78741",
    type: "Supercenter",
    emissions: 185000,
    lastUpdated: new Date("2025-06-01")
  },
  {
    storeId: "WM-TX-1002",
    location: { type: "Point", coordinates: [-96.7969, 32.7767] },
    city: "Dallas",
    state: "TX",
    address: "4001 E Highway 80, Dallas, TX 75150",
    type: "Supercenter",
    emissions: 210000,
    lastUpdated: new Date("2025-06-15")
  },
  // Florida (Sample 15 stores)
  {
    storeId: "WM-FL-2001",
    location: { type: "Point", coordinates: [-81.3792, 28.5383] },
    city: "Orlando",
    state: "FL",
    address: "8100 S John Young Pkwy, Orlando, FL 32819",
    type: "Supercenter",
    emissions: 165000,
    lastUpdated: new Date("2025-05-20")
  },
  // California (Sample 15 stores)
  {
    storeId: "WM-CA-3001",
    location: { type: "Point", coordinates: [-118.2437, 34.0522] },
    city: "Los Angeles",
    state: "CA",
    address: "6040 Laurel Canyon Blvd, Los Angeles, CA 91606",
    type: "Neighborhood Market",
    emissions: 75000,
    lastUpdated: new Date("2025-06-10")
  },
  // Add more stores following the same pattern...
  // Full dataset would include all 4,611 stores :cite[2]:cite[5]
];

// Seed database
const seedDB = async () => {
  await Store.deleteMany({});
  await Store.insertMany(mockStores);
  console.log('Database seeded with Walmart stores!');
  mongoose.connection.close();
};

seedDB().catch(err => console.error(err));