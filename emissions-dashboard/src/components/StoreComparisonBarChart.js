import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart as BarChartIcon } from 'lucide-react';

const StoreComparisonBarChart = ({ stores }) => {
  const data = stores.map(store => ({
    name: store.name,
    emissions: store.emissions,
    efficiency: store.efficiency,
  }));

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <BarChartIcon className="w-5 h-5 mr-2 text-yellow-400" />
        Store Comparison
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
            <Legend />
            <Bar dataKey="emissions" fill="#3B82F6" name="Emissions (kg)" />
            <Bar dataKey="efficiency" fill="#10B981" name="Efficiency (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StoreComparisonBarChart; 