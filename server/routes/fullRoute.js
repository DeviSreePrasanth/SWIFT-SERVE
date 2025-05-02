const express = require('express');
const router = express.Router();

const { getVendorAndService } = require('../controllers/fullController');
router.get('/', getVendorAndService);
module.exports = router;