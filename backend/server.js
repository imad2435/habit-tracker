// Load environment variables from .env file
require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// --- Middlewares ---
// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// --- Routes ---
app.use('/api/habits', require('./routes/habitRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// A simple test route to make sure the server is working
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Habit Tracker API!' });
});

// --- Server Initialization ---
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});