const Cart=require('../models/CartSchema');
exports.addToCart=async(req,res)=>{
    try{
        const {userId,vendorId,serviceName,category,price}=req.body;

        let cart=await Cart.findOne({userId});
        const newItem={vendorId,serviceName,category,price};
        if(!cart){
            cart=new Cart({userId,items:[newItem]});
        }
        else{
            cart.items.push(newItem);
        }
        await cart.save();
        res.status(200).json({message:'service added to cart',cart});

    }
    catch(error){
        res.status(404).json({message:'Server error',details:error.message});
    }
 };
 exports.getCartByUser=async(req,res)=>{
    try{
        const{userId}=req.params;
        const cartItems=await Cart.find({userId});
        res.status(200).json(cartItems);
    }
    catch(err){
        res.status(500).json({message:'failed to fetch cart',error:err.message});
    }
 };
 
 exports.removeFromCart = async (req, res) => {
    try {
      const userId = req.params.userId;  
      const { vendorId, serviceName } = req.body;  

      const cart = await Cart.findOneAndUpdate(
        { userId },  
        {
          $pull: {  
            items: { vendorId, serviceName }
          }
        },
        { new: true }  
      );
      
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for user' });
      }
  
      
      res.status(200).json({ message: 'Service removed from cart', cart: cart.items });
    } catch (err) {
      res.status(500).json({ message: 'Failed to remove item from cart', error: err.message });
    }
  };
  

  