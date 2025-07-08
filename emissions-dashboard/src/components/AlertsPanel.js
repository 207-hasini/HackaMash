import React from 'react';
import { AlertTriangle, TrendingUp, Target } from 'lucide-react';

const AlertsPanel = () => {
  const alerts = [
    { type: 'critical', title: 'Critical Alert', message: 'Dallas Store showing 25% higher emissions than average', icon: AlertTriangle, iconColor: 'text-red-400', borderColor: 'border-red-700', bgColor: 'bg-red-900/20' },
    { type: 'recommendation', title: 'Recommendation', message: 'Consider HVAC optimization for Houston Store', icon: TrendingUp, iconColor: 'text-yellow-400', borderColor: 'border-yellow-700', bgColor: 'bg-yellow-900/20' },
    { type: 'success', title: 'Success', message: 'Austin Store achieved 87% efficiency target', icon: Target, iconColor: 'text-green-400', borderColor: 'border-green-700', bgColor: 'bg-green-900/20' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
        Alerts & Recommendations
      </h3>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className={`p-4 ${alert.bgColor} ${alert.borderColor} rounded-lg`}>
            <div className="flex items-center space-x-2 mb-2">
              <alert.icon className={`w-4 h-4 ${alert.iconColor}`} />
              <span className={`font-medium ${alert.iconColor}`}>{alert.title}</span>
            </div>
            <div className="text-sm text-gray-300">{alert.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel; 