const express = require('express');
const router = express.Router();

// POST route for vendor details
router.post('/details', async (req, res) => {
  try {
    // Extract form data from the request body
    const {
      fullName,
      mobileNumber,
      address,
      city,
      state,
      postalCode,
      businessDescription
    } = req.body;

    // Add your validation here, as per the previous logic
    const errors = {};
    if (!fullName.trim()) errors.fullName = 'Full Name is required';
    if (!mobileNumber.match(/^\d{10}$/)) errors.mobileNumber = 'Enter a valid 10-digit mobile number';
    if (!address.trim()) errors.address = 'Address is required';
    if (!city.trim()) errors.city = 'City is required';
    if (!state.trim()) errors.state = 'State is required';
    if (!postalCode.match(/^\d{5,6}$/)) errors.postalCode = 'Enter a valid postal code (5-6 digits)';
    if (!businessDescription.trim()) errors.businessDescription = 'Business Description is required';

    // If errors exist, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Mock logic for saving vendor details (can be replaced with actual DB logic)
    // Sample response (Replace this with actual database insertion logic)
    const vendorDetails = {
      fullName,
      mobileNumber,
      address,
      city,
      state,
      postalCode,
      businessDescription,
    };

    // In a real scenario, you'd save to the DB here
    // Example: VendorModel.create(vendorDetails);

    res.status(201).json({
      message: 'Vendor details saved successfully',
      data: vendorDetails
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

module.exports = router;
