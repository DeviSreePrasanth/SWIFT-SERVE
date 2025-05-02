const Vendor = require('../models/Vendor');
const Service = require('../models/Service');

const detail = async (req, res) => {
    try {
        const { name } = req.query;
        const temp = await Service.find({ category: name });
        const arr = temp.map(i => i.name);
        
        const data = await Vendor.find({
            categories: { $in: [name] },
            'services.name': { $in: arr }
        });
        
        const ans = data.map(i => {
            const help = temp.filter(j =>
                i.services.some(service => service.name === j.name)
            );
            return {
                ...i.toObject(),
                services: help.map(h => ({
                    name: h.name,
                    description: h.description,
                    category: h.category,
                    photo: i.services.find(s => s.name === h.name)?.photo
                }))
            };
        });
        
        res.status(200).json(ans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { detail };