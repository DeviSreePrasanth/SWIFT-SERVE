const express = require('express');
const router = express.Router();
const { submitVendorDetails, uploadVendorDocument } = require('../controllers/vendorController');

// Route to submit vendor details
router.post('/details', uploadVendorDocument, submitVendorDetails);

module.exports = router;