import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix for default marker icon issues with Webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const getStatusColor = (status) => {
  switch (status) {
    case 'optimal': return '#34D399'; // Green
    case 'good': return '#60A5FA'; // Blue
    case 'warning': return '#FBBF24'; // Yellow
    case 'critical': return '#EF4444'; // Red
    default: return '#ccc';
  }
};

const createStoreIcon = (status) => {
  const color = getStatusColor(status);
  return L.divIcon({
    html: `<div style="background-color: ${color}; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;"><svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 24 24' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg' style='color: white;'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z'></path></svg></div>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });
};

const storeCoordinates = {
  'WM1001': [30.2672, -97.7431], // Austin, TX
  'WM1002': [29.7604, -95.3698], // Houston, TX
  'WM1003': [32.7767, -96.7970], // Dallas, TX
  'WM1004': [29.4241, -98.4936], // San Antonio, TX
  'WM1005': [32.7555, -97.3307], // Fort Worth, TX
};

const StoreMap = ({ stores, onStoreClick }) => {
  const center = [31.9686, -99.9018]; // Center of Texas
  const zoom = 6;

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 h-[400px]">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
        Geo-mapped Emissions
      </h3>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stores.map(store => storeCoordinates[store.id] && (
          <Marker
            key={store.id}
            position={storeCoordinates[store.id]}
            icon={createStoreIcon(store.status)}
            eventHandlers={{ click: () => onStoreClick(store.id) }}
          >
            <Popup>
              <div className="font-bold text-gray-900">{store.name}</div>
              <div className="text-sm text-gray-700">{store.location}</div>
              <div className="font-medium" style={{ color: getStatusColor(store.status) }}>Status: {store.status}</div>
              <div className="text-sm text-gray-700">Emissions: {store.emissions.toFixed(1)} kg CO₂</div>
              <div className="text-sm text-gray-700">Efficiency: {store.efficiency}%</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default StoreMap; 