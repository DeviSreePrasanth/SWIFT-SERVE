const express=require('express');
const router=express.Router();
const {getVendor,getVendorByServiceName}=require('../controllers/vendorController');

router.get('/',getVendor);
router.get('/service/:serviceName',getVendorByServiceName);

module.exports=router;