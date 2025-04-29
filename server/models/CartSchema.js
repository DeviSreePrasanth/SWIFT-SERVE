const mongoose=require('mongoose');

const cartItemSchema=new mongoose.Schema({
    vendorId:{type:String,required:true},
    serviceName:{type: String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true}
},{_id: false});

const cartSchema=new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    items:[cartItemSchema]
},{timestamps:true});

module.exports=mongoose.model('Cart',cartSchema);