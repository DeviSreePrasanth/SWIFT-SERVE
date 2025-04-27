// In vendorController.js
const getPendingVendors = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      const pendingVendors = await User.find({
        role: 'vendor',
        isApproved: false,
        isRejected: false,
      });
  
      if (!pendingVendors || pendingVendors.length === 0) {
        return res.status(200).json([]);
      }
  
      res.status(200).json(pendingVendors);
    } catch (error) {
      console.error('Error fetching pending vendors:', error);
      res.status(500).json({ message: 'Server error while fetching pending vendors' });
    }
  };
  
  const approveVendor = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      const vendorId = req.params.id;
      const vendor = await User.findById(vendorId);
  
      if (!vendor || vendor.role !== 'vendor') {
        return res.status(404).json({ message: 'Vendor not found' });
      }
  
      vendor.isApproved = true;
      await vendor.save();
  
      res.status(200).json({ message: 'Vendor approved successfully' });
    } catch (error) {
      console.error('Error approving vendor:', error);
      res.status(500).json({ message: 'Server error while approving vendor' });
    }
  };
  
  const rejectVendor = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      const vendorId = req.params.id;
      const vendor = await User.findById(vendorId);
  
      if (!vendor || vendor.role !== 'vendor') {
        return res.status(404).json({ message: 'Vendor not found' });
      }
  
      vendor.isRejected = true;
      await vendor.save();
  
      res.status(200).json({ message: 'Vendor rejected successfully' });
    } catch (error) {
      console.error('Error rejecting vendor:', error);
      res.status(500).json({ message: 'Server error while rejecting vendor' });
    }
  };
  
  module.exports = { getPendingVendors, approveVendor, rejectVendor };
  