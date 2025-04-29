const express=require('express');
const router=express.Router();
const {getService,getServicesByCategory} =require('../controllers/serviceController');

router.get('/',getService);
router.get('/category/:categoryName',getServicesByCategory);