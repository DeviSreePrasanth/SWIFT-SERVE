const express = require('express');
const router = express.Router();
const submitVendorDetails = require('../controllers/vendorController');

// Route to submit vendor details
router.post('/details', submitVendorDetails);

module.exports = router;