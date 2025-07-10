const mongoose = require('mongoose');

const emissionSchema = new mongoose.Schema({
  storeId: { type: String, required: true, ref: 'Store' },
  co2_emissions: { type: Number, required: true }, // Total calculated CO₂ equivalent
  breakdown: { // The raw data used for calculation
      energy_kwh: Number,
      fuel_liters: Number,
      refrigerant_leaks_kg: Number // Leaks of HFCs
  },
  timestamp: { type: Date, default: Date.now, required: true }
});

// Create an index for faster queries by store and time
emissionSchema.index({ storeId: 1, timestamp: -1 });

module.exports = mongoose.model('Emission', emissionSchema);