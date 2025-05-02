const Vendor = require('../models/Vendor');
const Service = require('../models/Service');

const detail = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        // Find services matching the category
        const services = await Service.find({ category: name });
        if (!services.length) {
            return res.status(200).json([]);
        }

        const serviceNames = services.map(s => s.name);

        // Find vendors that offer these services and have the category
        const vendors = await Vendor.find({
            categories: { $in: [name] },
            'services.name': { $in: serviceNames }
        });

        // Create a flat array of vendor-service pairs
        const result = vendors.reduce((acc, vendor) => {
            const vendorServices = services.filter(s =>
                vendor.services.some(vs => vs.name === s.name)
            );

            // For each service, create a new object with vendor details and one service
            const vendorServicePairs = vendorServices.map(service => ({
                _id: vendor._id,
                name: vendor.name,
                phone: vendor.phone,
                contactEmail: vendor.contactEmail,
                address: vendor.address,
                categories: vendor.categories,
                createdAt: vendor.createdAt,
                service: {
                    _id: service._id,
                    name: service.name,
                    description: service.description,
                    category: service.category,
                    photo: vendor.services.find(vs => vs.name === service.name)?.photo || '',
                    price: vendor.services.find(vs => vs.name === service.name)?.price || 0
                }
            }));

            return [...acc, ...vendorServicePairs];
        }, []);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error in detail controller:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { detail };