const review=require('../models/reviewSchema');

const getReview=async (req,res)=>{
    try{
        const {name}=req.query;
        if(!name){
            return res.status(400).json({error:"NAME ISNT FETCHING"});
        }
        const data=await review.find({name});
        
        return res.status(200).json(data);
    }
    catch(e){
        return res.status(500).json({error:"SERVER ERROR"});
    }
}

const addReview=async (req,res)=>{
    try{
        const {name,user,rating,feedback}=req.body;
        if(!name || !rating || !feedback || !user){
            return res.status(400).json({error:"NAME OR RATING ISNT FETCHING"});
        }
        console.log(req.body);
        const data=await review.create({name,user,rating,feedback});
        return res.status(200).json(data);
    }
    catch (e) {
        if (e.code === 11000) {
          return res.status(409).json({ error: "User has already submitted a review." });
        }
        return res.status(500).json({ error: "SERVER ERROR" });
    } 
}

module.exports={getReview,addReview};