const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartController');

router.post('/', addToCart);
router.get('/', getCart);

module.exports = router;