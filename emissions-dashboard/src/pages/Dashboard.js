import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KpiCard from '../components/KpiCard';
import StoreStatusCard from '../components/StoreStatusCard';
import AlertsPanel from '../components/AlertsPanel';
import EmissionsLineChart from '../components/EmissionsLineChart';
import StoreComparisonBarChart from '../components/StoreComparisonBarChart';
import EnergyBreakdownPieChart from '../components/EnergyBreakdownPieChart';
import StoreMap from '../components/StoreMap';
import { Activity, Target, Zap, AlertTriangle, Clock } from 'lucide-react';

// Simulated initial data
const initialStores = [
  { id: 'WM1001', name: 'Austin Store', location: 'Austin, TX', emissions: 1200, efficiency: 87, status: 'optimal' },
  { id: 'WM1002', name: 'Houston Store', location: 'Houston, TX', emissions: 1600, efficiency: 78, status: 'good' },
  { id: 'WM1003', name: 'Dallas Store', location: 'Dallas, TX', emissions: 1800, efficiency: 65, status: 'warning' },
  { id: 'WM1004', name: 'San Antonio Store', location: 'San Antonio, TX', emissions: 1100, efficiency: 92, status: 'optimal' },
  { id: 'WM1005', name: 'Fort Worth Store', location: 'Fort Worth, TX', emissions: 1350, efficiency: 81, status: 'good' },
];

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

function Dashboard() {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stores, setStores] = useState(initialStores);
  const [emissionsData, setEmissionsData] = useState(initialEmissionsData);
  const [energyBreakdown] = useState(initialEnergyBreakdown);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setEmissionsData(prevData => {
        const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newEntry = { time: newTime };
        stores.forEach(store => {
          newEntry[store.id] = Math.max(1000, store.emissions + Math.random() * 100 - 50);
        });
        return [...prevData.slice(-6), newEntry];
      });
      setStores(prevStores => prevStores.map(store => ({
        ...store,
        emissions: Math.max(1000, store.emissions + Math.random() * 10 - 5),
        efficiency: Math.max(60, Math.min(95, store.efficiency + Math.random() * 2 - 1)),
        status: Math.random() < 0.1 ? 'critical' : (Math.random() < 0.3 ? 'warning' : 'optimal')
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, [stores]);

  // KPI calculations
  const totalEmissions = emissionsData.reduce((sum, entry) => {
    if (selectedStore === 'all') {
      return sum + Object.keys(entry).filter(key => key !== 'time').reduce((s, storeId) => s + (entry[storeId] || 0), 0);
    } else {
      return sum + (entry[selectedStore] || 0);
    }
  }, 0);
  const avgEfficiency = stores.length > 0 ? stores.reduce((sum, store) => sum + store.efficiency, 0) / stores.length : 0;
  const totalKwh = 14250;
  const activeAlerts = stores.filter(s => s.status === 'critical' || s.status === 'warning').length;

  // Store selection handler
  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 text-white p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2 md:mb-0">Dynamic Emissions Optimizer</h1>
        <div className="flex items-center space-x-2 text-lg font-mono text-yellow-200">
          <Clock className="w-5 h-5" />
          <span>{currentTime.toLocaleString()}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <select
          className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 text-white"
          value={selectedStore}
          onChange={e => setSelectedStore(e.target.value)}
        >
          <option value="all">All Stores</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
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
        <StoreMap stores={stores} onStoreClick={handleStoreClick} />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EmissionsLineChart data={emissionsData} selectedStore={selectedStore} />
        <StoreComparisonBarChart stores={stores} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EnergyBreakdownPieChart data={energyBreakdown} />
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">Store Status Overview</h3>
          <div className="space-y-3">
            {stores.map((store) => (
              <StoreStatusCard key={store.id} store={store} onClick={() => handleStoreClick(store.id)} />
            ))}
          </div>
        </div>
        <AlertsPanel />
      </div>
    </div>
  );
}

export default Dashboard; 