const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true,
        unique:true
    },
    rating:{
        type:Number,
        required:true
    },
    feedback:{
        type:String,
    },
},{collection:'review'});

module.exports=mongoose.model('Review',reviewSchema);