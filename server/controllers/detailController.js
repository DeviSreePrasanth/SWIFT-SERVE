const Vendor = require('../models/Vendor');
const Service = require('../models/Service');

const detail=async (req,res)=>{
    try{
        const name=req.query.name;

        const data=await Vendor.find({category:name}).populate('services');
    }

    catch (error) {
        res.status(500).json({ error: error.message });
      }
}