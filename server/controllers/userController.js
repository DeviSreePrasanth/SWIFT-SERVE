const mongoose = require('mongoose');
const Service = require('../models/Service');
const Vendor = require('../models/Vendor');

// Get all service categories (from previous route)
const getServices = async (req, res) => {
  try {
    const { isFeatured } = req.query;
    const query = isFeatured ? { isFeatured: isFeatured === 'true' } : {};
    const services = await Service.find(query).select('name description isFeatured');
    res.status(200).json({
      services: services.map((service) => ({
        serviceId: service._id,
        name: service.name,
        description: service.description,
        isFeatured: service.isFeatured,
      })),
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get vendors for a specific service (from previous route)
const getVendorsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { minPrice, maxPrice, minRating, lat, lng, radius = 10 } = req.query;

    // Manual validation
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ message: 'Invalid serviceId' });
    }
    if (minPrice && (isNaN(minPrice) || minPrice < 0)) {
      return res.status(400).json({ message: 'minPrice must be a non-negative number' });
    }
    if (maxPrice && (isNaN(maxPrice) || maxPrice < 0)) {
      return res.status(400).json({ message: 'maxPrice must be a non-negative number' });
    }
    if (minRating && (isNaN(minRating) || minRating < 1 || minRating > 5)) {
      return res.status(400).json({ message: 'minRating must be between 1 and 5' });
    }
    if ((lat || lng) && (isNaN(lat) || isNaN(lng))) {
      return res.status(400).json({ message: 'lat and lng must be numbers' });
    }
    if (radius && (isNaN(radius) || radius < 1)) {
      return res.status(400).json({ message: 'radius must be at least 1' });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const query = { 'services.serviceId': serviceId, status: 'approved' };
    if (minPrice || maxPrice) {
      query['services.price'] = {};
      if (minPrice) query['services.price'].$gte = Number(minPrice);
      if (maxPrice) query['services.price'].$lte = Number(maxPrice);
    }

    const vendors = await Vendor.find(query).select('name businessName services ratings serviceArea');
    const filteredVendors = vendors
      .map((vendor) => {
        const avgRating =
          vendor.ratings.length > 0
            ? vendor.ratings.reduce((sum, r) => sum + r.rating, 0) / vendor.ratings.length
            : 0;
        if (minRating && avgRating < Number(minRating)) {
          return null;
        }

        let distance = null;
        if (lat && lng) {
          const { lat: vendorLat, lng: vendorLng } = vendor.serviceArea.coordinates;
          const R = 6371;
          const dLat = ((lat - vendorLat) * Math.PI) / 180;
          const dLng = ((lng - vendorLng) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((vendorLat * Math.PI) / 180) * Math.cos((lat * Math.PI) / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          distance = R * c;
          if (distance > Number(radius) || distance > vendor.serviceArea.radius) {
            return null;
          }
        }

        const service = vendor.services.find((s) => s.serviceId.toString() === serviceId);
        return {
          vendorId: vendor._id,
          name: vendor.name,
          businessName: vendor.businessName,
          service: {
            name: service.name,
            price: service.price,
            description: service.description,
          },
          rating: avgRating,
          distance: distance ? Number(distance.toFixed(2)) : null,
        };
      })
      .filter((v) => v !== null);

    filteredVendors.sort((a, b) => (lat && lng ? a.distance - b.distance : b.rating - a.rating));
    res.status(200).json({ vendors: filteredVendors });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get vendor profile
const getVendorProfile = async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Minimal manual validation
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ message: 'Invalid vendorId' });
    }

    // Fetch vendor
    const vendor = await Vendor.findById(vendorId).select(
      'name businessName experience services ratings portfolioImages availability serviceArea'
    );

    if (!vendor || vendor.status !== 'approved') {
      return res.status(404).json({ message: 'Vendor not found or not approved' });
    }

    // Calculate average rating
    const avgRating =
      vendor.ratings.length > 0
        ? vendor.ratings.reduce((sum, r) => sum + r.rating, 0) / vendor.ratings.length
        : 0;

    // Format response
    const vendorProfile = {
      vendorId: vendor._id,
      name: vendor.name,
      businessName: vendor.businessName,
      experience: vendor.experience,
      services: vendor.services.map((s) => ({
        serviceId: s.serviceId,
        name: s.name,
        price: s.price,
        description: s.description,
      })),
      reviews: vendor.ratings.map((r) => ({
        userId: r.userId,
        rating: r.rating,
        comment: r.comment,
      })),
      portfolioImages: vendor.portfolioImages,
      availability: vendor.availability.map((a) => ({
        date: a.date.toISOString().split('T')[0],
        timeSlots: a.timeSlots.map((t) => ({
          start: t.start,
          end: t.end,
          isBooked: t.isBooked,
        })),
      })),
      serviceArea: {
        coordinates: vendor.serviceArea.coordinates,
        radius: vendor.serviceArea.radius,
      },
    };

    res.status(200).json({ vendor: vendorProfile });
  } catch (error) {
    console.error('Error fetching vendor profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getServices,
  getVendorsByService,
  getVendorProfile,
};