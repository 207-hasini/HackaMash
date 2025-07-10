// routes/emissions.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Emission = require('../models/Emission'); // Import the Emission model

// @route   POST /api/emissions/calculate-and-save
// @desc    Calculate emissions using ML service and save to database
// @access  Public
router.post('/calculate-and-save', async (req, res) => {
    try {
        const { storeId, electricity_kwh, diesel_liters, refrigerant_kg, manufacturing_units, timestamp } = req.body;

        // Step 1: Call ML service to calculate emissions and get suggestions
        const mlPayload = {
            electricity_kwh: parseFloat(electricity_kwh) || 0,
            diesel_liters: parseFloat(diesel_liters) || 0,
            refrigerant_kg: parseFloat(refrigerant_kg) || 0,
            manufacturing_units: parseFloat(manufacturing_units) || 0
        };

        console.log('Calling ML service with:', mlPayload);
        
        const mlResponse = await axios.post('http://localhost:5002/submit', mlPayload, {
            headers: { 'Content-Type': 'application/json' }
        });

        const { co2_emissions, suggestions } = mlResponse.data;

        // Step 2: Prepare data for database
        const emissionData = {
            storeId,
            co2_emissions,
            breakdown: {
                energy_kwh: mlPayload.electricity_kwh,
                fuel_liters: mlPayload.diesel_liters,
                refrigerant_leaks_kg: mlPayload.refrigerant_kg,
                manufacturing_units: mlPayload.manufacturing_units
            },
            suggestions,
            timestamp: timestamp ? new Date(timestamp) : new Date(),
            calculated_at: new Date()
        };

        // Step 3: Save to MongoDB
        const newEmission = new Emission(emissionData);
        await newEmission.save();

        console.log('Saved emission data:', newEmission);

        res.status(201).json({ 
            msg: 'Emission calculated and saved successfully', 
            data: newEmission,
            ml_results: {
                co2_emissions,
                suggestions
            }
        });
    } catch (err) {
        console.error('Error in calculate-and-save:', err.message);
        if (err.response) {
            console.error('ML service error:', err.response.data);
        }
        res.status(500).json({ error: 'Failed to calculate and save emissions', details: err.message });
    }
});

// @route   POST /api/emissions
// @desc    Saves a new emission record (existing route)
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { storeId, co2_emissions, breakdown, timestamp } = req.body;

        // Create a new document using the Mongoose model
        const newEmission = new Emission({
            storeId,
            co2_emissions,
            breakdown,
            timestamp
        });

        // Save it to the database
        await newEmission.save();

        res.status(201).json({ msg: 'Emission record created successfully', data: newEmission });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/emissions/suggestions/latest
// @desc    Get latest AI suggestions from all stores
// @access  Public
router.get('/suggestions/latest', async (req, res) => {
    try {
        const latestSuggestions = await Emission.find({ 
            suggestions: { $exists: true, $ne: [] } 
        })
        .sort({ calculated_at: -1 })
        .limit(10)
        .select('storeId suggestions calculated_at co2_emissions')
        .lean();

        if (!latestSuggestions || latestSuggestions.length === 0) {
            return res.json({ msg: 'No AI suggestions available yet', suggestions: [] });
        }

        res.json({ suggestions: latestSuggestions });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/emissions/daily/:storeId
// @desc    Get aggregated daily emissions for a specific store
// @access  Public
router.get('/daily/:storeId', async (req, res) => {
    try {
        const dailyEmissions = await Emission.aggregate([
            // 1. Match only the documents for the requested store
            { $match: { storeId: req.params.storeId } },

            // 2. Group documents by the date part of the timestamp
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
                    },
                    // 3. Sum the emissions and breakdown for each day
                    totalEmissions: { $sum: "$co2_emissions" },
                    totalEnergy: { $sum: "$breakdown.energy_kwh" },
                    totalFuel: { $sum: "$breakdown.fuel_liters" },
                    totalLeaks: { $sum: "$breakdown.refrigerant_leaks_kg" }
                }
            },

            // 4. Sort the results by date in ascending order
            { $sort: { _id: 1 } }
        ]);

        if (!dailyEmissions || dailyEmissions.length === 0) {
            return res.status(404).json({ msg: 'No emission data found for this store' });
        }

        res.json(dailyEmissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// THIS LINE MUST BE AT THE VERY END OF THE FILE!
module.exports = router;