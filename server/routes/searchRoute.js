const express=require('express');
const router=express.Router();

router.get('/',require('../controllers/searchController'));

module.exports=router;