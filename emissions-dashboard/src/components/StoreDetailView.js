import React from 'react';
import { X, TrendingUp, Zap, Thermometer, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const getStatusColor = (status) => {
  switch (status) {
    case 'optimal': return 'text-green-400';
    case 'good': return 'text-blue-400';
    case 'warning': return 'text-yellow-400';
    case 'critical': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

const StoreDetailView = ({ store, onClose }) => {
  if (!store) return null;
  // Simulated data for a single store's detailed emissions over time
  const storeEmissionsHistory = [
    { time: '00:00', emissions: store.emissions - 50 },
    { time: '04:00', emissions: store.emissions - 30 },
    { time: '08:00', emissions: store.emissions - 10 },
    { time: '12:00', emissions: store.emissions },
    { time: '16:00', emissions: store.emissions + 20 },
    { time: '20:00', emissions: store.emissions + 10 },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-blue-400 mb-6">{store.name} Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-300 mb-2 flex items-center"><Info className="w-5 h-5 mr-2 text-gray-400" />Basic Information</h4>
            <p className="text-gray-400">Location: {store.location}</p>
            <p className="text-gray-400">Store ID: {store.id}</p>
            <p className="text-gray-400">Current Status: <span className={`font-bold ${getStatusColor(store.status)}`}>{store.status}</span></p>
          </div>
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-300 mb-2 flex items-center"><Zap className="w-5 h-5 mr-2 text-yellow-400" />Current Metrics</h4>
            <p className="text-gray-400">Current Emissions: {store.emissions.toFixed(1)} kg CO₂</p>
            <p className="text-gray-400">Efficiency: {store.efficiency}%</p>
            <p className="text-gray-400">Estimated kWh Usage (last 24h): ~500 kWh</p>
            <p className="text-gray-400">Estimated Fuel Usage (last 24h): ~40 Liters</p>
          </div>
        </div>
        <div className="mb-8 bg-gray-700/30 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            CO₂ Emissions Over Time ({store.name})
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={storeEmissionsHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
                <Line type="monotone" dataKey="emissions" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gray-700/30 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-4 flex items-center">
            <Thermometer className="w-5 h-5 mr-2 text-orange-400" />
            Suggested Actions & Insights
          </h4>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Analyze recent HVAC system logs for potential leaks or inefficiencies.</li>
            <li>Review cold storage unit temperatures to ensure optimal settings without energy waste.</li>
            <li>Investigate sudden spikes in electricity usage during off-peak hours.</li>
            <li>Consider an energy audit for the refrigeration systems.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoreDetailView; 