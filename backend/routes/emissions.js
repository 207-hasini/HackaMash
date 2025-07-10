// routes/emissions.js
const express = require('express');
const router = express.Router();
const Emission = require('../models/Emission'); // Import the Emission model

// @route   POST /api/emissions
// @desc    Saves a new emission record
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