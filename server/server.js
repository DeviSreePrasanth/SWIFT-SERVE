const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const dotenv=require('dotenv');
const serviceRoutes=require('./routes/serviceRoute');
const db=require('./config/connectDB');
const app=express();
app.use(cors());
dotenv.config();
db();

app.use('/service',serviceRoutes);

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})

