const Booking=require('../models/Bookings');

const isSlotBooked=async(vendorId,slot)=>{
    return await Booking.exists({vendorId,slot});
};

exports.bookService=async(req,res)=>{
    try{
        const {userId,vendorId,serviceName,category,slot}=req.body;

        const slotTaken=await isSlotBooked(vendorId,slot);
        if(slotTaken){
            return res.status(400).json({message:'selected slot is already booked'})
        }

        const newBooking=new Booking({
            userId,
            vendorId,
            serviceName,
            category,
            slot
        });

        await newBooking.save();
        res.status(200).json({message:'booking successful',booking:newBooking});
    }
    catch(error){
        res.status(500).json({message:'booking failed',details:error.message});
    }
};

exports.getUserBookings=async(req,res)=>{
    try{
        const{userId}=req.params;
        const bookings=await Booking.find({userId}).populate('vendorId','name');
        res.status(200).json({bookings});
    }
    catch(err){
        res.status(500).json({message:'failed to fetch bookings',error:err.message});
    }
};