import React from 'react';
import { Activity, TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'optimal': return 'text-green-400 bg-green-400/10';
    case 'good': return 'text-blue-400 bg-blue-400/10';
    case 'warning': return 'text-yellow-400 bg-yellow-400/10';
    case 'critical': return 'text-red-400 bg-red-400/10';
    default: return 'text-gray-400 bg-gray-400/10';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'optimal': return <Target className="w-4 h-4" />;
    case 'good': return <TrendingUp className="w-4 h-4" />;
    case 'warning': return <AlertTriangle className="w-4 h-4" />;
    case 'critical': return <TrendingDown className="w-4 h-4" />;
    default: return <Activity className="w-4 h-4" />;
  }
};

const StoreStatusCard = ({ store, onClick }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm border border-yellow-400/20 rounded-lg hover:bg-white/20 transition-all duration-200 cursor-pointer" onClick={onClick}>
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(store.status)}`}>
          {getStatusIcon(store.status)}
        </div>
        <div>
          <div className="font-medium">{store.name}</div>
          <div className="text-sm text-gray-200">{store.city}, {store.state}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">{store.emissions.toFixed(1)} kg</div>
        <div className="text-sm text-gray-200">{store.efficiency}% efficiency</div>
      </div>
    </div>
  );
};

export default StoreStatusCard; 