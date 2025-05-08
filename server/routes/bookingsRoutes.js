const express=require('express');
const router=express.Router();
const {bookService, getUserBookings}=require('../controllers/bookingController');

router.post('/book',bookService);
router.get('/user/:userId',getUserBookings);

module.exports=router;