const Vendor = require('../models/Vendor');
const Service = require('../models/Service');

const detail=async (req,res)=>{
    try{
        const {name}=req.query;
        const temp=await Service.find({category:name});
        const arr=temp.map((i)=>i.name);
        const data=Vendor.find(
            {
                category:name,
                services: { $in: arr }
            }
        );
        const ans=data.map(i=>{
            const help=temp.filter(j=>
                data.services.includes(j.name)
            )
            return {
                ...data.toObject(),
                services: help,
            };
        });

        res.status(200).json(ans);
    }

    catch (error) {
        res.status(500).json({ error: error.message });
      }
}

module.exports={detail};