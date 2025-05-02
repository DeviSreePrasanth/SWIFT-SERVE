const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');

const authRoutes = require('./routes/authRoute');
const serviceRoutes=require('./routes/serviceRoute');
const searchRoute=require('./routes/searchRoute');
const vendorRoutes=require('./routes/vendorRoute');
const cartRoute=require('./routes/cartRoutes');
const bookingRoute=require('./routes/bookingsRoutes');
const detailRoute=require('./routes/detailRoute');
const reviewRoutes=require('./routes/reviewRoute');
const fullRoute=require('./routes/fullRoute');
const db=require('./config/connectDB');
const app=express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
dotenv.config();
db();

app.use('/auth', authRoutes);
app.use('/service',serviceRoutes);
app.use('/search', searchRoute);
app.use('/vendor',vendorRoutes);
app.use('/review',reviewRoutes); 
app.use('/cart',cartRoute); 
app.use('/bookings',bookingRoute);
app.use('/detail',detailRoute);
app.use('/vendor-service',fullRoute);
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})
