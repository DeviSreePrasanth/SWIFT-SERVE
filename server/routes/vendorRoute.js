const express = require('express');
const router = express.Router();

const vendorController = require('../controllers/vendorController');

router.get('/', vendorController.getAllVendors);
router.get('/category/:category', vendorController.getVendorsByCategory);

module.exports = router;
