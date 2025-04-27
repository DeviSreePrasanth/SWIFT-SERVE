const express = require('express');
const router = express.Router();
const { getServices, getVendorsByService, getVendorProfile } = require('../controllers/userController');

router.get('/services', getServices);
router.get('/services/:serviceId/vendors', getVendorsByService);
router.get('/vendors/:vendorId', getVendorProfile);

module.exports = router;