const review=require('../models/reviewSchema');

const getReview=async (req,res)=>{
    try{
        const {username}=req.query;
        if(!username){
            return res.status(400).json({error:"NAME ISNT FETCHING"});
        }
        const data=await review.find({username});
        
        return res.status(200).json(data);
    }
    catch(e){
        return res.status(500).json({error:"SERVER ERROR"});
    }
}

const addReview=async (req,res)=>{
    try{
        const {username,rating,feedback}=req.body;
        if(!username || !rating || !feedback){
            return res.status(400).json({error:"NAME OR RATING ISNT FETCHING"});
        }
        const data=await review.create({username,rating,feedback});
        return res.status(200).json(data);
    }
    catch(e){
        return res.status(500).json({error:"SERVER ERROR"});
    }   
}

module.exports={getReview,addReview};