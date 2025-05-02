const express = require('express');
const router = express.Router();
const { addToCart, getCartByUser, removeFromCart, clearCart } = require('../controllers/cartController');

router.post('/add', addToCart);
router.get('/:userId', getCartByUser);
router.delete('/remove/:userId', removeFromCart);
router.delete('/clear/:userId', clearCart);

module.exports = router;