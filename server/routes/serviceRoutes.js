const express = require('express');
const router = express.Router();
const { getAllServices, getServicesByCategory } = require('../controllers/serviceController');

router.get('/', getAllServices);
router.get('/category/:category', getServicesByCategory);

module.exports = router;