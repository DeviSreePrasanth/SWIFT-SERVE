const Vendor = require('../models/Vendor');

const addVendorDetails = async (req, res) => {
  try {
    const { fullName, mobileNumber, address, city, state, postalCode, businessDescription } = req.body;
    const newVendor = new Vendor({
      fullName,
      mobileNumber,
      address,
      city,
      state,
      postalCode,
      businessDescription
    });
    await newVendor.save();

    res.status(201).json({
      message: 'Vendor details added successfully',
      vendor: newVendor
    });
  } catch (error) {
    // Return error response
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addVendorDetails };
