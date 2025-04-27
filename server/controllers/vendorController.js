const Vendor = require('../models/Vendor');
const User = require('../models/User');

const vendorController = {
  saveDetails: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const { fullName, mobileNumber, address, city, state, postalCode, businessDescription } = req.body;
      if (!fullName || !mobileNumber || !address || !city || !state || !postalCode || !businessDescription) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      let vendor = await Vendor.findOne({ userId: req.user.userId });
      if (vendor) {
        vendor = await Vendor.findOneAndUpdate(
          { userId: req.user.userId },
          { fullName, mobileNumber, address, city, state, postalCode, businessDescription },
          { new: true }
        );
      } else {
        vendor = new Vendor({
          userId: req.user.userId,
          fullName,
          mobileNumber,
          address,
          city,
          state,
          postalCode,
          businessDescription,
          status: 'pending',
        });
        await vendor.save();
      }

      await User.findByIdAndUpdate(req.user.userId, { profileCompleted: true });

      res.status(200).json({ success: true, message: 'Vendor details saved successfully' });
    } catch (error) {
      console.error('Error saving vendor details:', error);
      next(error);
    }
  },
};

module.exports = vendorController;