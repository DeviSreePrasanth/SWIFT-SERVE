const Vendor = require('../models/vendorSchema');

// Get all pending approvals
exports.getPendingApprovals = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    const vendors = await Vendor.find({ status: 'pending' }).populate('userId', 'email');
    res.status(200).json(vendors);
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({ message: 'Error fetching approvals' });
  }
};

// Approve or reject a vendor
exports.updateApprovalStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json({ message: `Vendor ${status} successfully`, vendor });
  } catch (error) {
    console.error('Error updating approval status:', error);
    res.status(500).json({ message: 'Error updating approval status' });
  }
};
