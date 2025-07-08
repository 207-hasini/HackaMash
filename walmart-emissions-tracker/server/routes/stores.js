const express = require('express');
const router = express.Router();
const Store = require('../models/Address.js');

// Get all stores (for leaderboard)
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find().sort({ emissions: 1 }); // Sort by emissions (ascending)
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new store (for admin)
router.post('/', async (req, res) => {
  const store = new Store({
    storeId: req.body.storeId,
    location: {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    },
    city: req.body.city,
    state: req.body.state,
    emissions: req.body.emissions
  });

  try {
    const newStore = await store.save();
    res.status(201).json(newStore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;