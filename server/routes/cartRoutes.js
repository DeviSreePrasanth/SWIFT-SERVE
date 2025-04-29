const express=require('express');
const router=express.Router();
const {addToCart, getCartByUser, removeFromCart} =require('../controllers/cartController');
 
router.post('/add',addToCart);
router.get('/:userId',getCartByUser);
router.delete('/remove/:userId',removeFromCart);

module.exports=router;