import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Calendar, Filter } from 'lucide-react';
import sampleStores from '../sampleStores';

const COLORS = ['#3B82F6', '#FBBF24', '#10B981', '#EF4444', '#8B5CF6'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [region, setRegion] = useState('all');

  // Simulated analytics data
  const monthlyData = [
    { month: 'Jan', emissions: 45000, efficiency: 82, cost: 125000 },
    { month: 'Feb', emissions: 42000, efficiency: 85, cost: 118000 },
    { month: 'Mar', emissions: 48000, efficiency: 79, cost: 135000 },
    { month: 'Apr', emissions: 41000, efficiency: 87, cost: 112000 },
    { month: 'May', emissions: 46000, efficiency: 83, cost: 128000 },
    { month: 'Jun', emissions: 43000, efficiency: 86, cost: 120000 },
  ];

  // Get unique states
  const regions = Array.from(new Set(sampleStores.map(s => s.state)));

  // Filter stores by region
  const filteredStores = region === 'all'
    ? sampleStores
    : sampleStores.filter(s => s.state === region);

  // Map to chart data
  const storePerformance = filteredStores.map(store => ({
    name: `${store.city} Store`,
    emissions: store.emissions,
    efficiency: store.efficiency || 0,
    savings: 0 // Placeholder, update if you have savings data
  }));

  const energyBreakdown = [
    { name: 'Grid Electricity', value: 60, cost: 72000 },
    { name: 'Solar', value: 20, cost: 24000 },
    { name: 'Wind', value: 10, cost: 12000 },
    { name: 'Diesel', value: 10, cost: 12000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 text-white p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2 md:mb-0">Analytics & Insights</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-yellow-200" />
            <select
              className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400 text-white"
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
            <Filter className="w-5 h-5 text-yellow-200 ml-4" />
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
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-red-300">285,000 kg</div>
          <div className="text-sm text-gray-300">Total CO₂ Emissions</div>
          <div className="text-xs text-red-300 mt-1">↓ 12% from last period</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-green-300">84.2%</div>
          <div className="text-sm text-gray-300">Average Efficiency</div>
          <div className="text-xs text-green-300 mt-1">↑ 3.1% from last period</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-300">$67,000</div>
          <div className="text-sm text-gray-300">Total Savings</div>
          <div className="text-xs text-blue-300 mt-1">↑ 18% from last period</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <PieChartIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-300">5</div>
          <div className="text-sm text-gray-300">Stores Optimized</div>
          <div className="text-xs text-yellow-300 mt-1">100% coverage</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Trends */}
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
            <TrendingUp className="w-5 h-5 mr-2" />
            Monthly Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
                <Legend />
                <Line type="monotone" dataKey="emissions" stroke="#FBBF24" strokeWidth={2} name="Emissions (kg)" />
                <Line type="monotone" dataKey="efficiency" stroke="#3B82F6" strokeWidth={2} name="Efficiency (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Store Performance */}
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
            <BarChart3 className="w-5 h-5 mr-2" />
            Store Performance Comparison
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={storePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
                <Legend />
                <Bar dataKey="emissions" fill="#FBBF24" name="Emissions (kg)" />
                <Bar dataKey="efficiency" fill="#3B82F6" name="Efficiency (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Energy Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
            <PieChartIcon className="w-5 h-5 mr-2" />
            Energy Source Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={energyBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {energyBreakdown.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
            <BarChart3 className="w-5 h-5 mr-2" />
            Cost Analysis by Energy Source
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
                <Bar dataKey="cost" fill="#10B981" name="Cost ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 