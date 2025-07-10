import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Calendar, Store, Zap, Truck, Thermometer, Factory, PlusCircle } from 'lucide-react';
import sampleStores from '../sampleStores';

const storeOptions = sampleStores;

const initialForm = {
  store: '',
  date: '',
  electricity: '',
  diesel: '',
  refrigerant: '',
  manufacturing: ''
};

const DataInput = () => {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mlResults, setMlResults] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMlResults(null);
    
    try {
      // Call backend API with ML integration
      const payload = {
        storeId: form.store,
        electricity_kwh: parseFloat(form.electricity) || 0,
        diesel_liters: parseFloat(form.diesel) || 0,
        refrigerant_kg: parseFloat(form.refrigerant) || 0,
        manufacturing_units: parseFloat(form.manufacturing) || 0,
        timestamp: form.date + 'T10:00:00Z' // Add time component
      };

      console.log('🤖 Calling Walmart CO₂re ML Service...', payload);

      const response = await fetch('http://localhost:5001/api/emissions/calculate-and-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ ML Results received:', result);
      
      // Store ML results for display
      setMlResults(result.ml_results);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMlResults(null);
      }, 10000); // Show results for 10 seconds
      
      setForm(initialForm);
      
    } catch (error) {
      console.error('❌ Error submitting data:', error);
      alert('Error calculating emissions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600 text-white p-4">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-8 mt-8">
        <h1 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center">
          <PlusCircle className="w-6 h-6 mr-2" />
          Enter Emissions Data
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1 flex items-center">
              <Store className="w-4 h-4 mr-1" /> Store
            </label>
            <select
              name="store"
              value={form.store}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
            >
              <option value="">Select a store</option>
              {storeOptions.map((s) => (
                <option key={s.storeId} value={s.storeId}>{s.city}, {s.state} - {s.address}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1 flex items-center">
              <Calendar className="w-4 h-4 mr-1" /> Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1 flex items-center">
              <Zap className="w-4 h-4 mr-1" /> Electricity Usage (kWh)
            </label>
            <input
              type="number"
              name="electricity"
              value={form.electricity}
              onChange={handleChange}
              min="0"
              step="any"
              className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1 flex items-center">
              <Truck className="w-4 h-4 mr-1" /> Diesel Used (liters)
            </label>
            <input
              type="number"
              name="diesel"
              value={form.diesel}
              onChange={handleChange}
              min="0"
              step="any"
              className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1 flex items-center">
              <Thermometer className="w-4 h-4 mr-1" /> Refrigerant Used (kg)
            </label>
            <input
              type="number"
              name="refrigerant"
              value={form.refrigerant}
              onChange={handleChange}
              min="0"
              step="any"
              className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-yellow-300 mb-1 flex items-center">
              <Factory className="w-4 h-4 mr-1" /> Manufacturing Output (units)
            </label>
            <input
              type="number"
              name="manufacturing"
              value={form.manufacturing}
              onChange={handleChange}
              min="0"
              step="any"
              className="w-full bg-white/10 border border-yellow-400/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
            >
              <Save className="w-4 h-4 mr-1" />
              <span>Save Data</span>
            </button>
          </div>
          {loading && (
            <div className="flex items-center justify-center space-x-3 p-4 bg-blue-600/20 border border-blue-400 rounded-lg">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <span className="text-blue-300 font-semibold">🤖 Walmart CO₂re ML is calculating emissions...</span>
            </div>
          )}
          
          {success && (
            <div className="text-green-300 font-semibold text-center mt-2">✅ Data saved successfully!</div>
          )}
        </form>

        {/* ML Results Display */}
        {mlResults && (
          <div className="mt-8 space-y-6">
            {/* Emissions Calculation Results */}
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-400/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                🧮 ML Calculation Results
              </h2>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300">{mlResults.co2_emissions}</div>
                  <div className="text-lg text-gray-300">kg CO₂ equivalent</div>
                  <div className="text-sm text-gray-400 mt-1">Total calculated emissions</div>
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-400/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center">
                🤖 AI-Powered Suggestions
              </h2>
              {mlResults.suggestions && mlResults.suggestions.length > 0 ? (
                <div className="space-y-3">
                  {mlResults.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white/10 rounded-lg">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="text-gray-200">{suggestion}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-gray-400">
                  ✅ No specific recommendations - your emissions are within optimal ranges!
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
              >
                📊 View Updated Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInput; 