import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons

const walmartIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + '/mark.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

const StoreMap = ({ stores, onStoreClick, selectedStore }) => {
  const center = [37.0902, -95.7129]; // Center of USA
  const zoom = 4;

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6 h-[500px]">
      <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
        Walmart Store Emissions Map
      </h3>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full rounded-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stores.map(store => (
          <Marker
            key={store.storeId}
            position={[store.location.coordinates[1], store.location.coordinates[0]]}
            icon={walmartIcon}
            eventHandlers={{ click: () => onStoreClick && onStoreClick(store) }}
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
  );
};

export default StoreMap; 