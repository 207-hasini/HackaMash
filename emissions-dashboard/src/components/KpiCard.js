import React from 'react';

const KpiCard = ({ icon: Icon, title, value, unit, trend, trendColor, trendText, bgColor, hoverBgColor, iconBgGradient }) => {
  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 ${hoverBgColor} transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${iconBgGradient} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-gray-400">{unit}</span>
      </div>
      <div className={`text-2xl font-bold ${trendColor}`}>{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
      <div className={`text-xs ${trendColor} mt-1`}>{trend} {trendText}</div>
    </div>
  );
};

export default KpiCard; 