const Booking=require('../models/Bookings');

const isSlotBooked = async (vendorId, slot) => {
    const existingBooking = await Booking.findOne({ 
      vendorId, 
      slot,
      status: { $ne: 'cancelled' } // Ignore cancelled bookings
    });
    return !!existingBooking;
  };
  
  exports.bookService = async (req, res) => {
    try {
      const { userId, vendorId, serviceName, category, slot } = req.body;
  
      // Validate slot is in the future
      const slotDate = new Date(slot);
      if (slotDate < new Date()) {
        return res.status(400).json({ message: 'Cannot book past time slots' });
      }
  
      const slotTaken = await isSlotBooked(vendorId, slot);
      if (slotTaken) {
        return res.status(400).json({ message: 'Selected slot is already booked' });
      }
  
      const newBooking = new Booking({
        userId,
        vendorId,
        serviceName,
        category,
        slot,
        status: 'confirmed',
        paymentStatus: 'completed'
      });
  
      await newBooking.save();
      
      // In a real app, you would integrate with a payment processor here
      // and update payment status based on the result
      
      res.status(200).json({ 
        message: 'Booking successful', 
        booking: newBooking 
      });
    } catch (error) {
      console.error('Booking error:', error);
      res.status(500).json({ 
        message: 'Booking failed', 
        details: error.message 
      });
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