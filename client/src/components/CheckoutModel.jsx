import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

const CheckoutModal = ({ isOpen, onClose, bookings, userId }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Process each booking
      console.log(userId);
      const bookingPromises = bookings.map(booking => 
        axios.post('http://localhost:5000/api/bookings/book', {
          userId,
          vendorId: booking.vendorId,
          serviceName: booking.serviceName,
          category: booking.category
        })
      );
      
      await Promise.all(bookingPromises);
      console.log('All bookings processed successfully!');
      toast.success('Payment successful! Bookings confirmed.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      
      onClose(true); // Close modal and indicate success
    } catch (error) {
      toast.error(`Payment failed: ${error.response?.data?.message || error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-700"
        >
          <button 
            onClick={() => onClose(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Complete Your Booking</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {['credit', 'paypal'].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-3 px-4 rounded-lg border transition-colors ${paymentMethod === method 
                        ? 'border-blue-500 bg-blue-500/10 text-white' 
                        : 'border-gray-600 hover:border-gray-500 text-gray-300'}`}
                    >
                      {method === 'credit' ? 'Credit Card' : 'PayPal'}
                    </button>
                  ))}
                </div>
                
                {paymentMethod === 'credit' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Name on Card</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div className="bg-gray-700/50 rounded-lg p-6 text-center">
                    <p className="text-gray-300 mb-4">You'll be redirected to PayPal to complete your payment</p>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 inline-block">
                      <svg className="w-10 h-10 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.5 11.5h1.5v-4h-1.5v4zm3.5 0h1.5v-4H11v4zm3.5 0h1.5v-4h-1.5v4zm-7 2.5h1.5v3H7.5v-3zm3.5 0h1.5v3H11v-3zm3.5 0h1.5v3h-1.5v-3z"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-400">Total</span>
                  <span className="font-bold text-xl text-white">
                    ${bookings.reduce((sum, item) => sum + Number(item.cost || 0), 0).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transition-all relative overflow-hidden ${
                  isProcessing 
                    ? 'bg-blue-600/50 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : (
                  <span className="relative z-10">Confirm & Pay</span>
                )}
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CheckoutModal;