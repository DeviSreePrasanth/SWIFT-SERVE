const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const serviceRoutes=require('./routes/serviceRoute');
const searchRoutes=require('./routes/searchRoute');
const vendorRoutes=require('./routes/vendorRoute');
const db=require('./config/connectDB');
const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();
db();

app.use('/service',serviceRoutes);
app.use('/search',searchRoutes);
app.use('/vendor',vendorRoutes);

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})

