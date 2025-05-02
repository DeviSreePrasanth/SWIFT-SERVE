const mongoose=require('mongoose');
 const bookingSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    vendorId:{type:String,required:true},
    serviceName:{type:String,required:true},
    category:{type:String},
    status:{
        type:String,
        enum:['confirmed','pending'],
        default:'pending'
    }
 },{timestamps:true});

 module.exports=mongoose.model('Bookings',bookingSchema);