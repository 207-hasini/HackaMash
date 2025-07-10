// Sample Walmart store data with emissions
const sampleStores = [
  // Texas (5 stores)
  {
    storeId: "WM-TX-1001",
    location: { coordinates: [-97.7431, 30.2672] },
    city: "Austin",
    state: "TX",
    address: "710 E Ben White Blvd",
    emissions: 185000,
    efficiency: 85,
    status: "good",
    kwh: 22000
  },
  {
    storeId: "WM-TX-1002",
    location: { coordinates: [-96.7969, 32.7767] },
    city: "Dallas",
    state: "TX",
    address: "4001 E Highway 80",
    emissions: 210000,
    efficiency: 80,
    status: "critical",
    kwh: 25000
  },
  {
    storeId: "WM-TX-1003",
    location: { coordinates: [-95.3698, 29.7604] },
    city: "Houston",
    state: "TX",
    address: "111 Yale St",
    emissions: 198000,
    efficiency: 80,
    status: "good",
    kwh: 24000
  },
  {
    storeId: "WM-TX-1004",
    location: { coordinates: [-98.4936, 29.4241] },
    city: "San Antonio",
    state: "TX",
    address: "5555 Dezavala Rd",
    emissions: 167000,
    efficiency: 75,
    status: "good",
    kwh: 20000
  },
  {
    storeId: "WM-TX-1005",
    location: { coordinates: [-97.1467, 31.5493] },
    city: "Waco",
    state: "TX",
    address: "301 W State Hwy 6",
    emissions: 142000,
    efficiency: 70,
    status: "good",
    kwh: 17000
  },
  // California (5 stores)
  {
    storeId: "WM-CA-2001",
    location: { coordinates: [-118.2437, 34.0522] },
    city: "Los Angeles",
    state: "CA",
    address: "6040 Laurel Canyon Blvd",
    emissions: 75000,
    efficiency: 80,
    status: "good",
    kwh: 9000
  },
  {
    storeId: "WM-CA-2002",
    location: { coordinates: [-122.0839, 37.3861] },
    city: "Mountain View",
    state: "CA",
    address: "600 Showers Drive",
    emissions: 92000,
    efficiency: 70,
    status: "good",
    kwh: 11000
  },
  {
    storeId: "WM-CA-2003",
    location: { coordinates: [-117.1611, 32.7157] },
    city: "San Diego",
    state: "CA",
    address: "3162 University Ave",
    emissions: 187000,
    efficiency: 75,
    status: "warning",
    kwh: 22000
  },
  {
    storeId: "WM-CA-2004",
    location: { coordinates: [-121.4944, 38.5816] },
    city: "Sacramento",
    state: "CA",
    address: "1000 Riverside Parkway",
    emissions: 165000,
    efficiency: 70,
    status: "good",
    kwh: 19000
  },
  {
    storeId: "WM-CA-2005",
    location: { coordinates: [-122.2711, 37.8044] },
    city: "Oakland",
    state: "CA",
    address: "8400 Edgewater Dr",
    emissions: 68000,
    efficiency: 65,
    status: "good",
    kwh: 8000
  },
  // Florida (4 stores)
  {
    storeId: "WM-FL-3001",
    location: { coordinates: [-81.3792, 28.5383] },
    city: "Orlando",
    state: "FL",
    address: "8100 S John Young Pkwy",
    emissions: 165000,
    efficiency: 75,
    status: "good",
    kwh: 19000
  },
  {
    storeId: "WM-FL-3002",
    location: { coordinates: [-80.1918, 25.7617] },
    city: "Miami",
    state: "FL",
    address: "2950 SW 8th St",
    emissions: 178000,
    efficiency: 70,
    status: "critical",
    kwh: 21000
  },
  {
    storeId: "WM-FL-3003",
    location: { coordinates: [-82.4572, 27.9506] },
    city: "Tampa",
    state: "FL",
    address: "1505 N Dale Mabry Hwy",
    emissions: 155000,
    efficiency: 65,
    status: "good",
    kwh: 18000
  },
  {
    storeId: "WM-FL-3004",
    location: { coordinates: [-81.3789, 28.4815] },
    city: "Kissimmee",
    state: "FL",
    address: "2051 E Osceola Pkwy",
    emissions: 72000,
    efficiency: 60,
    status: "good",
    kwh: 8500
  },
  // New York (3 stores)
  {
    storeId: "WM-NY-4001",
    location: { coordinates: [-73.9352, 40.7306] },
    city: "New York",
    state: "NY",
    address: "5030 Broadway",
    emissions: 65000,
    efficiency: 70,
    status: "good",
    kwh: 7500
  },
  {
    storeId: "WM-NY-4002",
    location: { coordinates: [-73.7935, 40.7039] },
    city: "Valley Stream",
    state: "NY",
    address: "100 Green Acres Rd",
    emissions: 185000,
    efficiency: 65,
    status: "good",
    kwh: 22000
  },
  {
    storeId: "WM-NY-4003",
    location: { coordinates: [-78.4647, 42.8864] },
    city: "Batavia",
    state: "NY",
    address: "4133 Veterans Memorial Dr",
    emissions: 142000,
    efficiency: 55,
    status: "good",
    kwh: 17000
  },
  // Illinois (3 stores)
  {
    storeId: "WM-IL-5001",
    location: { coordinates: [-87.6298, 41.8781] },
    city: "Chicago",
    state: "IL",
    address: "4626 W Diversey Ave",
    emissions: 195000,
    efficiency: 70,
    status: "warning",
    kwh: 23000
  },
  {
    storeId: "WM-IL-5002",
    location: { coordinates: [-88.9531, 40.5142] },
    city: "Normal",
    state: "IL",
    address: "501 S Cottage Ave",
    emissions: 168000,
    efficiency: 60,
    status: "good",
    kwh: 19000
  },
  {
    storeId: "WM-IL-5003",
    location: { coordinates: [-88.2434, 40.1164] },
    city: "Champaign",
    state: "IL",
    address: "2610 N Prospect Ave",
    emissions: 85000,
    efficiency: 50,
    status: "good",
    kwh: 10000
  },
  // Other states (12 stores)
  {
    storeId: "WM-PA-6001",
    location: { coordinates: [-76.6413, 39.9526] },
    city: "Philadelphia",
    state: "PA",
    address: "2200 W Oregon Ave",
    emissions: 172000,
    efficiency: 70,
    status: "good",
    kwh: 20000
  },
  {
    storeId: "WM-OH-7001",
    location: { coordinates: [-82.9988, 39.9612] },
    city: "Columbus",
    state: "OH",
    address: "3579 S High St",
    emissions: 188000,
    efficiency: 65,
    status: "good",
    kwh: 22000
  },
  {
    storeId: "WM-GA-8001",
    location: { coordinates: [-84.3880, 33.7490] },
    city: "Atlanta",
    state: "GA",
    address: "1800 Howell Mill Rd NW",
    emissions: 195000,
    efficiency: 70,
    status: "good",
    kwh: 24000
  },
  {
    storeId: "WM-NC-9001",
    location: { coordinates: [-78.6382, 35.7796] },
    city: "Raleigh",
    state: "NC",
    address: "1520 N New Hope Rd",
    emissions: 165000,
    efficiency: 60,
    status: "good",
    kwh: 18000
  },
  {
    storeId: "WM-WA-10001",
    location: { coordinates: [-122.3321, 47.6062] },
    city: "Seattle",
    state: "WA",
    address: "2215 4th Ave S",
    emissions: 78000,
    efficiency: 50,
    status: "good",
    kwh: 9000
  },
  {
    storeId: "WM-CO-11001",
    location: { coordinates: [-104.9903, 39.7392] },
    city: "Denver",
    state: "CO",
    address: "7800 E Smith Rd",
    emissions: 125000,
    efficiency: 60,
    status: "good",
    kwh: 15000
  },
  {
    storeId: "WM-AZ-12001",
    location: { coordinates: [-112.0740, 33.4484] },
    city: "Phoenix",
    state: "AZ",
    address: "5251 W Indian School Rd",
    emissions: 198000,
    efficiency: 70,
    status: "good",
    kwh: 25000
  },
  {
    storeId: "WM-MI-13001",
    location: { coordinates: [-83.0466, 42.3314] },
    city: "Detroit",
    state: "MI",
    address: "5851 Mercury Dr",
    emissions: 185000,
    efficiency: 65,
    status: "good",
    kwh: 21000
  },
  {
    storeId: "WM-NV-14001",
    location: { coordinates: [-115.1398, 36.1699] },
    city: "Las Vegas",
    state: "NV",
    address: "540 Marks St",
    emissions: 175000,
    efficiency: 55,
    status: "good",
    kwh: 20000
  },
  {
    storeId: "WM-OR-15001",
    location: { coordinates: [-122.6765, 45.5231] },
    city: "Portland",
    state: "OR",
    address: "4200 SE 82nd Ave",
    emissions: 95000,
    efficiency: 40,
    status: "good",
    kwh: 11000
  },
  {
    storeId: "WM-MN-16001",
    location: { coordinates: [-93.2650, 44.9778] },
    city: "Minneapolis",
    state: "MN",
    address: "3000 White Bear Ave N",
    emissions: 135000,
    efficiency: 50,
    status: "good",
    kwh: 15000
  },
  {
    storeId: "WM-MO-17001",
    location: { coordinates: [-90.1994, 38.6270] },
    city: "St. Louis",
    state: "MO",
    address: "11101 St Charles Rock Rd",
    emissions: 168000,
    efficiency: 60,
    status: "good",
    kwh: 19000
  }
];

export default sampleStores; 