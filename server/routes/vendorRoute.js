const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authMiddleware = require('../middleware/auth');

// Ensure you're passing functions, not the whole object
router.get('/pending', authMiddleware, vendorController.getPendingVendors);  // This should work
router.patch('/:id/approve', authMiddleware, vendorController.approveVendor); // This should work
router.patch('/:id/reject', authMiddleware, vendorController.rejectVendor);  // This should work

module.exports = router;
