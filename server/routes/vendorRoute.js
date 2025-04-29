const express=require('express');
const router=express.Router();
const {getVendor,getVendorByCategory}=require('../controllers/vendorController');