const Vendor=require('../models/Vendor');
const Service=require('../models/Service');

const getVendor=async (req,res)=>{
    try{
        const vendors=await Vendor.find().populate('services');
        res.json(vendors);
    }catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const getVendorByServiceName = async (req, res) => {
    const { serviceName } = req.params;
  
    try {
      const vendors = await Vendor.find({ services: serviceName });
      res.json(vendors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = { getVendor, getVendorByServiceName };