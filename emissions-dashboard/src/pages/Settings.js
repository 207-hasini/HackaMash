import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, User, Globe, Monitor, Save } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    criticalAlerts: true,
    weeklyReports: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    theme: 'dark',
    timezone: 'UTC-6',
    units: 'metric',
    refreshRate: '5s',
  });

  const [dataSettings, setDataSettings] = useState({
    autoRefresh: true,
    dataRetention: '90d',
    exportFormat: 'csv',
    backupFrequency: 'daily',
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDisplayChange = (key, value) => {
    setDisplaySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataChange = (key, value) => {
    setDataSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-yellow-400">Settings</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-yellow-400">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-200 capitalize">
                    {key === 'sms' ? 'SMS' : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className="text-sm text-gray-400">
                    {key === 'email' && 'Receive email notifications'}
                    {key === 'push' && 'Browser push notifications'}
                    {key === 'sms' && 'SMS alerts for critical issues'}
                    {key === 'criticalAlerts' && 'Immediate alerts for critical emissions'}
                    {key === 'weeklyReports' && 'Weekly summary reports'}
                  </div>
                </div>
                <button
                  onClick={() => handleNotificationChange(key)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    value ? 'transform translate-x-6' : 'transform translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-yellow-400">
            <Monitor className="w-5 h-5 mr-2" />
            Display Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Theme</label>
              <div className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white">Dark</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Timezone</label>
              <select
                value={displaySettings.timezone}
                onChange={(e) => handleDisplayChange('timezone', e.target.value)}
                className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Units</label>
              <select
                value={displaySettings.units}
                onChange={(e) => handleDisplayChange('units', e.target.value)}
                className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="metric">Metric (kg, kWh)</option>
                <option value="imperial">Imperial (lbs, BTU)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Data Refresh Rate</label>
              <select
                value={displaySettings.refreshRate}
                onChange={(e) => handleDisplayChange('refreshRate', e.target.value)}
                className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="1s">1 second</option>
                <option value="5s">5 seconds</option>
                <option value="10s">10 seconds</option>
                <option value="30s">30 seconds</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-yellow-400">
            <Database className="w-5 h-5 mr-2" />
            Data Management
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-200">Auto Refresh</div>
                <div className="text-sm text-gray-400">Automatically refresh data</div>
              </div>
              <button
                onClick={() => handleDataChange('autoRefresh', !dataSettings.autoRefresh)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  dataSettings.autoRefresh ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  dataSettings.autoRefresh ? 'transform translate-x-6' : 'transform translate-x-1'
                }`} />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Data Retention</label>
              <select
                value={dataSettings.dataRetention}
                onChange={(e) => handleDataChange('dataRetention', e.target.value)}
                className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="30d">30 days</option>
                <option value="90d">90 days</option>
                <option value="180d">180 days</option>
                <option value="1y">1 year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Export Format</label>
              <select
                value={dataSettings.exportFormat}
                onChange={(e) => handleDataChange('exportFormat', e.target.value)}
                className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="xlsx">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Backup Frequency</label>
              <select
                value={dataSettings.backupFrequency}
                onChange={(e) => handleDataChange('backupFrequency', e.target.value)}
                className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center text-yellow-400">
            <Shield className="w-5 h-5 mr-2" />
            System Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Version</span>
              <span className="text-gray-200">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Last Updated</span>
              <span className="text-gray-200">2024-01-15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Database Status</span>
              <span className="text-green-400">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">API Status</span>
              <span className="text-green-400">Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Storage Used</span>
              <span className="text-gray-200">2.4 GB / 10 GB</span>
            </div>
            <div className="pt-4 border-t border-gray-600">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 