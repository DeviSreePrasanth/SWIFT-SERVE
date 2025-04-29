const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
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