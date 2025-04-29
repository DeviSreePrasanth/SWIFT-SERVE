const Service = require("../models/Service");

const search = async (req,res)=>{
    try{
        const {name}=req.query;
        if(!name){
            return res.status(400).json({error:"NAME ISNT FETCHING"});
        }
        const data=await Service.find({name});
        //const data1=await vendors.find({name});
        
        if(data.length===0){
            return res.status(404).json({error:"NOT FOUND"});
        }
        return res.status(200).json(data);

    }
    catch(e){
        return res.status(500).json({error:"SERVER ERROR"});
    }
}

module.exports={search};