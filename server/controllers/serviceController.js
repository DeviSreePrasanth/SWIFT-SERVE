const Service=require('../models/Service');

const getService=async (req,res)=>{
    try{
        const Service=await Service.find();
        res.json(Services);
    }catch(error){
        res.status(500).json({message:'Server Error'});
    }
};

const getServicesByCategory=async (req,res)=>{
    try{
        const category=req.params.categoryName;
        const services=await Service.find({category});
        res.json(services);
    }catch(error){
        res.status(500).json({message:'Server Error'});
    }
}

module.exports={getService,getServicesByCategory};
