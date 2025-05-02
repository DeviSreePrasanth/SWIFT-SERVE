import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutModal from '../components/CheckoutModel';

const CartPage = () => {
  const { userId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const navigate = useNavigate();
  const user={
    name: localStorage.getItem('userName') 
  }
  
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${user.name}`);
      setCartItems(response.data[0]?.items || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart items: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const handleRemoveFromCart = async (vendorId, serviceName) => {
    setIsRemoving(true);
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${user.name}`, {
        data: { vendorId, serviceName },
      });
      setCartItems(response.data.cart || []);
      setError(null);
    } catch (err) {
      setError('Failed to remove item from cart: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsRemoving(false);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const handleProceedToBook = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = (success) => {
    setIsCheckoutOpen(false);
    if (success) {
      // Clear cart on successful payment
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      } 
    },
    exit: { 
      opacity: 0, 
      x: -50, 
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      } 
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const buttonHover = {
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  };

  const buttonTap = {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-950">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: 360 
            }}
            transition={{ 
              loop: Infinity,
              ease: "linear",
              duration: 1
            }}
            className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent"
          ></motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Header />

      <main className="flex-grow">
        {/* Premium Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-gradient-to-br from-gray-900 via-blue-900/50 to-gray-900 py-24 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/30 to-gray-950/90"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Service Cart</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-100/80 max-w-3xl mx-auto"
            >
              Review and confirm your selected professional services
            </motion.p>
          </div>
        </motion.section>

        {/* Cart Content */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          {error ? (
            <motion.div 
              variants={fadeIn}
              className="text-center py-16"
            >
              <motion.div 
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1.1, 1]
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4"
              >
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </motion.div>
              <h3 className="text-xl font-medium text-white mb-2">Error Loading Cart</h3>
              <p className="text-gray-400 max-w-md mx-auto">{error}</p>
              <motion.button 
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={fetchCart}
                className="mt-6 px-8 py-3.5 rounded-xl font-medium bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Retry</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          ) : cartItems.length === 0 ? (
            <motion.div 
              variants={fadeIn}
              className="text-center py-16"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2
                  }
                }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4"
              >
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </motion.div>
              <h3 className="text-2xl font-medium text-white mb-3">Your Cart Feels Lonely</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                You haven't added any services yet. Let's find something amazing for you!
              </p>
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={() => navigate('/services')}
                className="px-8 py-3.5 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Browse Premium Services</span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          ) : (
            <div className="lg:flex gap-8">
              <div className="lg:w-2/3">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.vendorId}-${item.serviceName}`}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
                      }}
                      className="flex flex-col sm:flex-row gap-6 p-6 mb-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700/30 transition-all hover:border-blue-500/30"
                    >
                      <div className="sm:w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl relative group">
                        <motion.img
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'}
                          alt={item.serviceName}
                          className="w-full h-full object-cover absolute inset-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-blue-600/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{item.serviceName}</h3>
                            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                              </svg>
                              {item.vendorName || 'Professional Vendor'}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveFromCart(item.vendorId, item.serviceName)}
                            disabled={isRemoving}
                            className="p-2 rounded-full bg-gray-700 hover:bg-red-500/20 text-red-400 hover:text-red-500 disabled:opacity-50 transition-colors relative overflow-hidden"
                          >
                            {isRemoving ? (
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ 
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                className="block w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full"
                              ></motion.span>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </motion.button>
                        </div>
                        <div className="mt-6 flex justify-between items-end">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            ${Number(item.price || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="lg:w-1/3">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.4,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    } 
                  }}
                  className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/30 sticky top-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium text-white">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service Fee</span>
                      <span className="font-medium text-white">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Tax</span>
                      <span className="font-medium text-white">$0.00</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-700/50 pt-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xl text-white">Total</span>
                      <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                    onClick={handleProceedToBook}
                    disabled={loading || cartItems.length === 0}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-xl shadow-xl relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Proceed to Checkout
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.button>
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 5px 15px -5px rgba(255, 255, 255, 0.1)"
                    }}
                    whileTap={buttonTap}
                    onClick={() => navigate('/services')}
                    className="w-full mt-4 py-3.5 px-6 bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium rounded-xl shadow-lg border border-gray-600/30 hover:border-gray-500/50 transition-all relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Continue Shopping
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          )}
        </motion.section>
      </main>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCheckoutComplete}
        bookings={cartItems.map((item) => ({
          serviceName: item.serviceName,
          vendorId: item.vendorId,
          category: item.category,
          dateTime: new Date().toISOString(),
          cost: item.price,
        }))}
        userId={user.name}
      />

      <Footer />
    </div>
  );
};

export default CartPage;