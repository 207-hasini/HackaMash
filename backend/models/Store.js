const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  storeId: { type: String, required: true, unique: true }, 
  location: {
    address: String,
    city: String,
    coordinates: { lat: Number, lng: Number }
  }
});

module.exports = mongoose.model('Store', storeSchema);