import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Zap } from 'lucide-react';

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444'];

const EnergyBreakdownPieChart = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-yellow-400" />
        Energy Source Breakdown
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnergyBreakdownPieChart; 