const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const serviceRoutes=require('./routes/serviceRoute');
const searchRoute=require('./routes/searchRoute');
const vendorRoutes=require('./routes/vendorRoute');
const cartRoute=require('./routes/cartRoutes');
const bookingRoute=require('./routes/bookingsRoutes');
const detailRoute=require('./routes/detailRoute');
const reviewRoutes=require('./routes/reviewRoute');
const db=require('./config/connectDB');
const app=express();
app.use(cors({
    origin: 'http://localhost:5173',
  }));
app.use(express.json());
dotenv.config();
db();

app.use('/api/service',serviceRoutes);
app.use('/api/search', searchRoute);
app.use('/api/vendor',vendorRoutes);
app.use('/api/review',reviewRoutes); 
app.use('/api/cart',cartRoute); 
app.use('/api/bookings',bookingRoute);
app.use('/api/detail',detailRoute);

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})
