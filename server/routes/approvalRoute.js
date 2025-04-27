// routes/approvalRoute.js
const express = require('express');
const router = express.Router();
const approvalController = require('../controllers/approvalController');

// Get all pending approvals
router.get('/approvals/pending', approvalController.getPendingApprovals);

// Approve or reject a vendor
router.put('/approvals/:id', approvalController.updateApprovalStatus);

module.exports = router;
