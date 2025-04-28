
const express = require('express');
const connectDB = require('./config/connectDB');
const cors = require('cors');
require('dotenv').config();
const vendorRoutes = require('./routes/vendorRoute');
const approvalRoutes = require('./routes/approvalRoute');
const authRoutes = require('./routes/auth');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/vendor', vendorRoutes);
app.use('/api/admin', approvalRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Server error', details: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));