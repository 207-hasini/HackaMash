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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage (simulate backend)
    const key = `emissions_${form.store}_${form.date}`;
    localStorage.setItem(key, JSON.stringify(form));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    setForm(initialForm);
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
          {success && (
            <div className="text-green-300 font-semibold text-center mt-2">Data saved successfully!</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DataInput; 