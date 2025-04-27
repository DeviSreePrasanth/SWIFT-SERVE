const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



// Import routes


const approvalRoutes = require('./routes/approvalRoute');
const authRoutes = require('./routes/auth');
const vendorRoute = require('./routes/vendorRoute'); 

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoute);

// Routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.use('/api', approvalRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
