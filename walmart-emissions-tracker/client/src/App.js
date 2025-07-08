import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components (kept in case you want to add charts later)
Chart.register(...registerables);

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker icon for Walmart stores
const walmartIcon = new L.Icon({
  iconUrl: '/mark.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

// Sample Walmart store data with emissions
const sampleStores = [
  // Texas (10 stores)
  {
    storeId: "WM-TX-1001",
    location: { coordinates: [-97.7431, 30.2672] },
    city: "Austin",
    state: "TX",
    address: "710 E Ben White Blvd",
    emissions: 185000,
    type: "Supercenter"
  },
  {
    storeId: "WM-TX-1002",
    location: { coordinates: [-96.7969, 32.7767] },
    city: "Dallas",
    state: "TX",
    address: "4001 E Highway 80",
    emissions: 210000,
    type: "Supercenter"
  },
  {
    storeId: "WM-TX-1003",
    location: { coordinates: [-95.3698, 29.7604] },
    city: "Houston",
    state: "TX",
    address: "111 Yale St",
    emissions: 198000,
    type: "Supercenter"
  },
  {
    storeId: "WM-TX-1004",
    location: { coordinates: [-98.4936, 29.4241] },
    city: "San Antonio",
    state: "TX",
    address: "5555 Dezavala Rd",
    emissions: 167000,
    type: "Supercenter"
  },
  {
    storeId: "WM-TX-1005",
    location: { coordinates: [-97.1467, 31.5493] },
    city: "Waco",
    state: "TX",
    address: "301 W State Hwy 6",
    emissions: 142000,
    type: "Neighborhood Market"
  },

  // California (10 stores)
  {
    storeId: "WM-CA-2001",
    location: { coordinates: [-118.2437, 34.0522] },
    city: "Los Angeles",
    state: "CA",
    address: "6040 Laurel Canyon Blvd",
    emissions: 75000,
    type: "Neighborhood Market"
  },
  {
    storeId: "WM-CA-2002",
    location: { coordinates: [-122.0839, 37.3861] },
    city: "Mountain View",
    state: "CA",
    address: "600 Showers Drive",
    emissions: 92000,
    type: "Neighborhood Market"
  },
  {
    storeId: "WM-CA-2003",
    location: { coordinates: [-117.1611, 32.7157] },
    city: "San Diego",
    state: "CA",
    address: "3162 University Ave",
    emissions: 187000,
    type: "Supercenter"
  },
  {
    storeId: "WM-CA-2004",
    location: { coordinates: [-121.4944, 38.5816] },
    city: "Sacramento",
    state: "CA",
    address: "1000 Riverside Parkway",
    emissions: 165000,
    type: "Supercenter"
  },
  {
    storeId: "WM-CA-2005",
    location: { coordinates: [-122.2711, 37.8044] },
    city: "Oakland",
    state: "CA",
    address: "8400 Edgewater Dr",
    emissions: 68000,
    type: "Neighborhood Market"
  },

  // Florida (8 stores)
  {
    storeId: "WM-FL-3001",
    location: { coordinates: [-81.3792, 28.5383] },
    city: "Orlando",
    state: "FL",
    address: "8100 S John Young Pkwy",
    emissions: 165000,
    type: "Supercenter"
  },
  {
    storeId: "WM-FL-3002",
    location: { coordinates: [-80.1918, 25.7617] },
    city: "Miami",
    state: "FL",
    address: "2950 SW 8th St",
    emissions: 178000,
    type: "Supercenter"
  },
  {
    storeId: "WM-FL-3003",
    location: { coordinates: [-82.4572, 27.9506] },
    city: "Tampa",
    state: "FL",
    address: "1505 N Dale Mabry Hwy",
    emissions: 155000,
    type: "Supercenter"
  },
  {
    storeId: "WM-FL-3004",
    location: { coordinates: [-81.3789, 28.4815] },
    city: "Kissimmee",
    state: "FL",
    address: "2051 E Osceola Pkwy",
    emissions: 72000,
    type: "Neighborhood Market"
  },

  // New York (5 stores)
  {
    storeId: "WM-NY-4001",
    location: { coordinates: [-73.9352, 40.7306] },
    city: "New York",
    state: "NY",
    address: "5030 Broadway",
    emissions: 65000,
    type: "Neighborhood Market"
  },
  {
    storeId: "WM-NY-4002",
    location: { coordinates: [-73.7935, 40.7039] },
    city: "Valley Stream",
    state: "NY",
    address: "100 Green Acres Rd",
    emissions: 185000,
    type: "Supercenter"
  },
  {
    storeId: "WM-NY-4003",
    location: { coordinates: [-78.4647, 42.8864] },
    city: "Batavia",
    state: "NY",
    address: "4133 Veterans Memorial Dr",
    emissions: 142000,
    type: "Supercenter"
  },

  // Illinois (5 stores)
  {
    storeId: "WM-IL-5001",
    location: { coordinates: [-87.6298, 41.8781] },
    city: "Chicago",
    state: "IL",
    address: "4626 W Diversey Ave",
    emissions: 195000,
    type: "Supercenter"
  },
  {
    storeId: "WM-IL-5002",
    location: { coordinates: [-88.9531, 40.5142] },
    city: "Normal",
    state: "IL",
    address: "501 S Cottage Ave",
    emissions: 168000,
    type: "Supercenter"
  },
  {
    storeId: "WM-IL-5003",
    location: { coordinates: [-88.2434, 40.1164] },
    city: "Champaign",
    state: "IL",
    address: "2610 N Prospect Ave",
    emissions: 85000,
    type: "Neighborhood Market"
  },

  // Other states (12 stores)
  {
    storeId: "WM-PA-6001",
    location: { coordinates: [-76.6413, 39.9526] },
    city: "Philadelphia",
    state: "PA",
    address: "2200 W Oregon Ave",
    emissions: 172000,
    type: "Supercenter"
  },
  {
    storeId: "WM-OH-7001",
    location: { coordinates: [-82.9988, 39.9612] },
    city: "Columbus",
    state: "OH",
    address: "3579 S High St",
    emissions: 188000,
    type: "Supercenter"
  },
  {
    storeId: "WM-GA-8001",
    location: { coordinates: [-84.3880, 33.7490] },
    city: "Atlanta",
    state: "GA",
    address: "1800 Howell Mill Rd NW",
    emissions: 195000,
    type: "Supercenter"
  },
  {
    storeId: "WM-NC-9001",
    location: { coordinates: [-78.6382, 35.7796] },
    city: "Raleigh",
    state: "NC",
    address: "1520 N New Hope Rd",
    emissions: 165000,
    type: "Supercenter"
  },
  {
    storeId: "WM-WA-10001",
    location: { coordinates: [-122.3321, 47.6062] },
    city: "Seattle",
    state: "WA",
    address: "2215 4th Ave S",
    emissions: 78000,
    type: "Neighborhood Market"
  },
  {
    storeId: "WM-CO-11001",
    location: { coordinates: [-104.9903, 39.7392] },
    city: "Denver",
    state: "CO",
    address: "7800 E Smith Rd",
    emissions: 125000,
    type: "Supercenter"
  },
  {
    storeId: "WM-AZ-12001",
    location: { coordinates: [-112.0740, 33.4484] },
    city: "Phoenix",
    state: "AZ",
    address: "5251 W Indian School Rd",
    emissions: 198000,
    type: "Supercenter"
  },
  {
    storeId: "WM-MI-13001",
    location: { coordinates: [-83.0466, 42.3314] },
    city: "Detroit",
    state: "MI",
    address: "5851 Mercury Dr",
    emissions: 185000,
    type: "Supercenter"
  },
  {
    storeId: "WM-NV-14001",
    location: { coordinates: [-115.1398, 36.1699] },
    city: "Las Vegas",
    state: "NV",
    address: "540 Marks St",
    emissions: 175000,
    type: "Supercenter"
  },
  {
    storeId: "WM-OR-15001",
    location: { coordinates: [-122.6765, 45.5231] },
    city: "Portland",
    state: "OR",
    address: "4200 SE 82nd Ave",
    emissions: 95000,
    type: "Neighborhood Market"
  },
  {
    storeId: "WM-MN-16001",
    location: { coordinates: [-93.2650, 44.9778] },
    city: "Minneapolis",
    state: "MN",
    address: "3000 White Bear Ave N",
    emissions: 135000,
    type: "Supercenter"
  },
  {
    storeId: "WM-MO-17001",
    location: { coordinates: [-90.1994, 38.6270] },
    city: "St. Louis",
    state: "MO",
    address: "11101 St Charles Rock Rd",
    emissions: 168000,
    type: "Supercenter"
  }
];

function App() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch from your backend API
    // axios.get('http://localhost:5000/routes/stores.js')
    //   .then(res => setStores(res.data))
    //   .catch(err => console.error(err));
    
    // For demo purposes, using sample data
    setStores(sampleStores);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0055a5', textAlign: 'center' }}>Walmart Store Emissions Tracker</h1>
      
      {/* Interactive Map Section */}
      <div style={{ margin: '20px 0', height: '500px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <MapContainer 
          center={[37.0902, -95.7129]} 
          zoom={4} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {stores.map(store => (
            <Marker
              key={store.storeId}
              position={[store.location.coordinates[1], store.location.coordinates[0]]}
              icon={walmartIcon}
              eventHandlers={{
                click: () => setSelectedStore(store),
                mouseover: () => setSelectedStore(store),
                mouseout: () => setSelectedStore(null),
              }}
            >
              <Popup>
                <strong>{store.storeId}</strong><br />
                {store.city}, {store.state}<br />
                {store.address}<br />
                Emissions: {store.emissions.toLocaleString()} kg CO₂
              </Popup>
              <Tooltip direction="top" opacity={0.9} permanent={false}>
                <div style={{ fontWeight: 'bold' }}>{store.storeId}</div>
                <div>{store.city}, {store.state}</div>
                <div style={{ color: store.emissions > 100000 ? '#ff6b6b' : '#51cf66' }}>
                  Emissions: {store.emissions.toLocaleString()} kg CO₂
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Enhanced Leaderboard */}
      <h2 style={{ color: '#0055a5', borderBottom: '2px solid #0055a5', paddingBottom: '5px' }}>
        Emissions Leaderboard
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#0055a5', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Rank</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Store ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Location</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Emissions (kg CO₂)</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[...stores].sort((a, b) => a.emissions - b.emissions).map((store, index) => (
              <tr 
                key={store.storeId} 
                style={{ 
                  borderBottom: '1px solid #ddd',
                  backgroundColor: selectedStore?.storeId === store.storeId ? '#e6f2ff' : 'transparent',
                }}
                onMouseEnter={() => setSelectedStore(store)}
                onMouseLeave={() => selectedStore?.storeId === store.storeId && setSelectedStore(null)}
              >
                <td style={{ padding: '12px' }}>{index + 1}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{store.storeId}</td>
                <td style={{ padding: '12px' }}>{store.city}, {store.state}</td>
                <td style={{ padding: '12px' }}>{store.type || 'Supercenter'}</td>
                <td style={{ 
                  padding: '12px', 
                  color: store.emissions > 100000 ? '#ff6b6b' : '#51cf66',
                  fontWeight: store.emissions > 100000 ? 'bold' : 'normal'
                }}>
                  {store.emissions.toLocaleString()}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    backgroundColor: store.emissions > 100000 ? '#ffebee' : '#e8f5e9',
                    color: store.emissions > 100000 ? '#c62828' : '#2e7d32'
                  }}>
                    {store.emissions > 100000 ? 'Needs Improvement' : 'Efficient'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;