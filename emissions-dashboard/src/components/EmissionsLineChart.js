import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const EmissionsLineChart = ({ data, selectedStore }) => {
  // Dynamically get all storeIds from the data keys (excluding 'time')
  const allStoreIds = data.length > 0 ? Object.keys(data[0]).filter(key => key !== 'time') : [];
  const storeIds = selectedStore === 'all' ? allStoreIds : [selectedStore];
  const colors = ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#FF6B6B', '#51CF66', '#FFD700', '#A020F0', '#00CED1'];

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
        Real-Time Emissions Trend
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
            <Legend />
            {storeIds.map((storeId, idx) => (
              <Line key={storeId} type="monotone" dataKey={storeId} stroke={colors[idx % colors.length]} strokeWidth={2} dot={{ fill: colors[idx % colors.length] }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionsLineChart; 