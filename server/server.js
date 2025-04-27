const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Sample protected route for home page
app.get('/api/home', (req, res) => {
  res.json({ message: 'Welcome to the Home Page' });
});

// Sample protected route for vendor dashboard
app.get('/api/vendor-dashboard', (req, res) => {
  res.json({ message: 'Welcome to the Vendor Dashboard' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));