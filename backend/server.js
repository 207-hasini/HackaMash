const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- DB Config ---
const db = 'mongodb+srv://hrose7760:Rosie@cluster0.i11aut2.mongodb.net/';


mongoose
  .connect(db)
  .then(() => console.log('MongoDB Atlas Connected...'))
  .catch(err => console.log(err));

// Your API routes will go here
 app.use('/api/emissions', require('./routes/emissions'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));