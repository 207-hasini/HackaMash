import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Zap, Thermometer, Info, Clock } from 'lucide-react';
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

const StoreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulated store data - in a real app, this would be fetched based on the ID
  const storeData = {
    'WM1001': { id: 'WM1001', name: 'Austin Store', location: 'Austin, TX', emissions: 1200, efficiency: 87, status: 'optimal' },
    'WM1002': { id: 'WM1002', name: 'Houston Store', location: 'Houston, TX', emissions: 1600, efficiency: 78, status: 'good' },
    'WM1003': { id: 'WM1003', name: 'Dallas Store', location: 'Dallas, TX', emissions: 1800, efficiency: 65, status: 'warning' },
    'WM1004': { id: 'WM1004', name: 'San Antonio Store', location: 'San Antonio, TX', emissions: 1100, efficiency: 92, status: 'optimal' },
    'WM1005': { id: 'WM1005', name: 'Fort Worth Store', location: 'Fort Worth, TX', emissions: 1350, efficiency: 81, status: 'good' },
  };

  const store = storeData[id];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!store) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 text-white p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-yellow-400 mb-4">Store Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-lg px-4 py-2 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-yellow-400">{store.name} Details</h1>
        </div>
        <div className="flex items-center space-x-2 text-lg font-mono text-yellow-200">
          <Clock className="w-5 h-5" />
          <span>{currentTime.toLocaleString()}</span>
        </div>
      </div>

      {/* Store Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Basic Information
          </h4>
          <div className="space-y-2 text-gray-200">
            <p><span className="font-medium">Location:</span> {store.location}</p>
            <p><span className="font-medium">Store ID:</span> {store.id}</p>
            <p><span className="font-medium">Current Status:</span> 
              <span className={`font-bold ml-2 ${getStatusColor(store.status)}`}>{store.status}</span>
            </p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Current Metrics
          </h4>
          <div className="space-y-2 text-gray-200">
            <p><span className="font-medium">Current Emissions:</span> {store.emissions.toFixed(1)} kg CO₂</p>
            <p><span className="font-medium">Efficiency:</span> {store.efficiency}%</p>
            <p><span className="font-medium">Estimated kWh Usage (last 24h):</span> ~500 kWh</p>
            <p><span className="font-medium">Estimated Fuel Usage (last 24h):</span> ~40 Liters</p>
          </div>
        </div>
      </div>

      {/* Emissions Chart */}
      <div className="mb-8 bg-white/10 backdrop-blur-sm border border-yellow-400/30 p-6 rounded-xl">
        <h4 className="text-lg font-semibold mb-4 flex items-center text-yellow-400">
          <TrendingUp className="w-5 h-5 mr-2" />
          CO₂ Emissions Over Time ({store.name})
        </h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={storeEmissionsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
              <Line type="monotone" dataKey="emissions" stroke="#FBBF24" strokeWidth={2} dot={{ fill: '#FBBF24' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 p-6 rounded-xl">
        <h4 className="text-lg font-semibold mb-4 flex items-center text-yellow-400">
          <Thermometer className="w-5 h-5 mr-2" />
          Suggested Actions & Insights
        </h4>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li>Analyze recent HVAC system logs for potential leaks or inefficiencies.</li>
          <li>Review cold storage unit temperatures to ensure optimal settings without energy waste.</li>
          <li>Investigate sudden spikes in electricity usage during off-peak hours.</li>
          <li>Consider an energy audit for the refrigeration systems.</li>
          <li>Implement smart lighting controls to reduce unnecessary energy consumption.</li>
          <li>Monitor refrigeration system performance and schedule maintenance if needed.</li>
        </ul>
      </div>
    </div>
  );
};

export default StoreDetails; 