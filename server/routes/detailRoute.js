const express=require('express');
const router=express.Router();

const {detail}=require('../controllers/detailController');

router.get('/',detail);

module.exports=router;