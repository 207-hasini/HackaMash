import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KpiCard from '../components/KpiCard';
import StoreStatusCard from '../components/StoreStatusCard';
import AlertsPanel from '../components/AlertsPanel';
import AISuggestionsPanel from '../components/AISuggestionsPanel';
import EnergyBreakdownPieChart from '../components/EnergyBreakdownPieChart';
import StoreMap from '../components/StoreMap';
import sampleStores from '../sampleStores';
import { Activity, Target, Zap, AlertTriangle, Clock } from 'lucide-react';

// Simulated initial data
const initialEmissionsData = [
  { time: '00:00', WM1001: 1200, WM1002: 1600, WM1003: 1800, WM1004: 1100, WM1005: 1350 },
  { time: '04:00', WM1001: 1180, WM1002: 1580, WM1003: 1750, WM1004: 1080, WM1005: 1320 },
  { time: '08:00', WM1001: 1350, WM1002: 1720, WM1003: 1920, WM1004: 1280, WM1005: 1450 },
  { time: '12:00', WM1001: 1420, WM1002: 1800, WM1003: 2100, WM1004: 1350, WM1005: 1520 },
  { time: '16:00', WM1001: 1380, WM1002: 1750, WM1003: 2050, WM1004: 1320, WM1005: 1480 },
  { time: '20:00', WM1001: 1245, WM1002: 1635, WM1003: 1893, WM1004: 1156, WM1005: 1388 }
];

const initialEnergyBreakdown = [
  { name: 'Grid Electricity', value: 60 },
  { name: 'Solar', value: 20 },
  { name: 'Wind', value: 10 },
  { name: 'Diesel', value: 10 },
];

// Simulate time-series emissions data for each store
const timeLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
const emissionsData = timeLabels.map((time) => {
  const entry = { time };
  sampleStores.forEach(store => {
    // Simulate emissions with some random variation
    entry[store.storeId] = Math.max(0, store.emissions + Math.floor(Math.random() * 2000 - 1000));
  });
  return entry;
});

function Dashboard() {
  const [selectedStore, setSelectedStore] = useState(null);
  const [timeRange, setTimeRange] = useState('24h');
  const [stores, setStores] = useState([]);
  const [energyBreakdown] = useState(initialEnergyBreakdown);
  const [region, setRegion] = useState('all');

  useEffect(() => {
    setStores(sampleStores);
  }, []);

  // Get unique states from stores
  const regions = Array.from(new Set(stores.map(s => s.state)));
  // Filter stores by region
  const filteredStores = region === 'all' ? stores : stores.filter(s => s.state === region);
  // Sort and limit to top 5 by emissions
  const topStores = [...filteredStores].sort((a, b) => b.emissions - a.emissions).slice(0, 5);

  // Determine which stores to use for KPIs: single store if selected, else filteredStores
  const kpiStores = selectedStore ? [selectedStore] : filteredStores;
  // KPI calculations (context-aware)
  const totalEmissions = kpiStores.reduce((sum, store) => sum + (store.emissions || 0), 0);
  const avgEfficiency = kpiStores.length > 0 ? kpiStores.reduce((sum, store) => sum + (store.efficiency || 0), 0) / kpiStores.length : 0;
  const totalKwh = kpiStores.reduce((sum, store) => sum + (store.kwh || 0), 0);
  let activeAlerts;
  if (!selectedStore) {
    // All stores or region: count in filteredStores
    activeAlerts = filteredStores.filter(s => s.status === 'critical' || s.status === 'warning').length;
  } else {
    // Single store: 1 if critical/warning, else 0
    activeAlerts = (selectedStore.status === 'critical' || selectedStore.status === 'warning') ? 1 : 0;
  }

  console.log('kpiStores:', kpiStores);
  console.log('selectedStore:', selectedStore);

  // Store selection handler
  const handleStoreClick = (store) => {
    setSelectedStore(store);
    // Optionally navigate to details: navigate(`/store/${store.storeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 text-white p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2 md:mb-0">Walmart CO₂re Dashboard</h1>
        <div className="flex items-center space-x-2 text-lg font-mono text-yellow-200">
          <Clock className="w-5 h-5" />
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <select
          className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 text-white"
          value={selectedStore?.storeId || 'all'}
          onChange={e => setSelectedStore(e.target.value === 'all' ? null : stores.find(s => s.storeId === e.target.value))}
        >
          <option value="all">All Stores</option>
          {stores.map(store => (
            <option key={store.storeId} value={store.storeId}>{store.city}, {store.state}</option>
          ))}
        </select>
        <select
          className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 text-white"
          value={timeRange}
          onChange={e => setTimeRange(e.target.value)}
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard
          icon={Activity}
          title="Total CO₂ Emissions (kg)"
          value={totalEmissions.toFixed(1)}
          unit="kg"
          trend="↑ 5.2%"
          trendColor="text-red-300"
          trendText="from yesterday"
          iconBgGradient="from-red-500 to-orange-500"
          hoverBgColor="hover:bg-white/10"
        />
        <KpiCard
          icon={Target}
          title="Average Efficiency"
          value={`${avgEfficiency.toFixed(1)}%`}
          unit="%"
          trend="↑ 2.1%"
          trendColor="text-green-300"
          trendText="from yesterday"
          iconBgGradient="from-green-500 to-teal-500"
          hoverBgColor="hover:bg-white/10"
        />
        <KpiCard
          icon={Zap}
          title="Total kWh Usage"
          value={totalKwh.toLocaleString()}
          unit="kWh"
          trend="↓ 1.8%"
          trendColor="text-blue-300"
          trendText="from yesterday"
          iconBgGradient="from-blue-500 to-purple-500"
          hoverBgColor="hover:bg-white/10"
        />
        <KpiCard
          icon={AlertTriangle}
          title="Active Alerts"
          value={activeAlerts}
          unit="alerts"
          trend="Requires attention"
          trendColor="text-yellow-300"
          iconBgGradient="from-yellow-500 to-orange-500"
          hoverBgColor="hover:bg-white/10"
        />
      </div>

      {/* Map */}
      <div className="mb-8">
        <StoreMap stores={stores} onStoreClick={handleStoreClick} selectedStore={selectedStore} />
      </div>

      {/* Emissions Leaderboard */}
      <h2 className="text-2xl font-bold text-yellow-400 border-b-2 border-yellow-400 pb-2 mb-4">Emissions Leaderboard</h2>
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr className="bg-yellow-400 text-blue-900">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Store ID</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Emissions (kg CO₂)</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {[...stores].sort((a, b) => a.emissions - b.emissions).map((store, index) => (
              <tr
                key={store.storeId}
                className={
                  (selectedStore?.storeId === store.storeId ? 'bg-blue-100 text-blue-900' : 'bg-transparent') +
                  ' border-b border-gray-200 hover:bg-yellow-100 hover:text-blue-900 transition-colors duration-150'
                }
                onMouseEnter={() => setSelectedStore(store)}
                onMouseLeave={() => selectedStore?.storeId === store.storeId && setSelectedStore(null)}
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-bold">{store.storeId}</td>
                <td className="p-3">{store.city}, {store.state}</td>
                <td className={
                  'p-3 ' + (store.emissions > 100000 ? 'text-red-500 font-bold' : 'text-green-500')
                }>
                  {store.emissions.toLocaleString()}
                </td>
                <td className="p-3">
                  <span className={
                    'px-3 py-1 rounded-full ' +
                    (store.emissions > 100000 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700')
                  }>
                    {store.emissions > 100000 ? 'Needs Improvement' : 'Efficient'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Main Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EmissionsLineChart data={emissionsData} selectedStore={selectedStore ? selectedStore.storeId : 'all'} />
        <StoreComparisonBarChart stores={stores} />
      </div> */}

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EnergyBreakdownPieChart data={energyBreakdown} />
        
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">Store Status Overview</h3>
          {/* Region Filter Dropdown */}
          <div className="mb-4">
            <select
              className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 text-white"
              value={region}
              onChange={e => setRegion(e.target.value)}
            >
              <option value="all">All Regions</option>
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            {topStores.map((store) => (
              <StoreStatusCard key={store.storeId} store={store} onClick={() => handleStoreClick(store)} />
            ))}
            {topStores.length === 0 && (
              <div className="text-gray-400 text-center">No stores found for this region.</div>
            )}
          </div>
        </div>
        
        <AISuggestionsPanel />
      </div>
      
      {/* Traditional Alerts Panel - Additional Section */}
      <div className="mt-8">
        <AlertsPanel />
      </div>
    </div>
  );
}

export default Dashboard; 