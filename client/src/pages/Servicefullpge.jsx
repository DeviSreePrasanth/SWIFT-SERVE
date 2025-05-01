import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

function ServiceFullPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const service = state?.service;
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (!service) {
      navigate('/services');
    } else {
      setTimeout(() => setIsLoaded(true), 300);
      axios
        .get(`http://localhost:5000/api/review?name=${service.name}`)
        .then((response) => {
          const reviewsData = response.data;
          setReviews(reviewsData);
          if (reviewsData.length > 0) {
            const avgRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;
            setAverageRating(avgRating);
          }
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [service, navigate]);

  const handleAddToCart = () => {
    navigate(`/cart/add/${service.services[0]?._id}`);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => {
      const starValue = i + 1;
      let fillPercentage = '0%';
      
      if (rating >= starValue) {
        fillPercentage = '100%';
      } else if (rating >= starValue - 0.5) {
        fillPercentage = '50%';
      }

      return (
        <div key={i} className="relative inline-block w-6 h-6">
          <svg
            className="absolute w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
            />
          </svg>
          <div 
            className="absolute overflow-hidden"
            style={{ width: fillPercentage, height: '100%' }}
          >
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
              />
            </svg>
          </div>
        </div>
      );
    });
  };

  if (!service) return null;

  return (
    <div className="dark bg-gray-900 min-h-screen overflow-hidden">
      <Header />

      {/* Animated Particle Background */}
      <div className="fixed inset-0 overflow-hidden z-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/30"
            initial={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            {/* Hero Section */}
            <div className="relative mb-16 sm:mb-20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10" />
              
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
                >
                  {service.services[0]?.name || 'Service'}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
                >
                  Powered by <span className="font-bold text-blue-400">{service.name}</span> — Professional Excellence
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 flex justify-center items-center space-x-4"
                >
                  <div className="flex items-center">
                    {renderStars(averageRating)}
                    <span className="ml-2 text-gray-300 text-sm sm:text-base">
                      {averageRating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                  </div>
                  <span className="h-4 w-px bg-gray-600"></span>
                  <span className="text-gray-300 text-sm sm:text-base">
                    {service.services[0]?.category || 'Premium Service'}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
              {/* Left Panel */}
              <div className="relative lg:col-span-2 space-y-8">
                {/* Service Image */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden border-2 border-gray-700/50 backdrop-blur-lg bg-gradient-to-br from-gray-800/50 to-gray-900/70 shadow-xl"
                >
                  <img
                    src={service.services[0]?.imageUrl}
                    alt={service.services[0]?.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-500"
                    style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 sm:p-8">
                    <div>
                      <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-black/50 backdrop-blur-md rounded-full text-xs sm:text-sm font-bold text-blue-300 border border-blue-500/30 mb-2 sm:mb-3">
                        {service.services[0]?.category || 'Premium Service'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">{service.name}</h2>
                    </div>
                  </div>
                </motion.div>

                {/* Tabs Navigation */}
                <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl backdrop-blur-lg p-1">
                  <nav className="flex space-x-1">
                    {['details', 'features', 'faq'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === tab ? 'bg-gray-700/50 text-white shadow' : 'text-gray-400 hover:text-gray-300'}`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="bg-gray-800/30 border-2 border-gray-700/30 rounded-3xl p-6 sm:p-8 backdrop-blur-lg shadow-xl min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'details' && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <span className="bg-blue-500/20 p-2 rounded-lg mr-3">📋</span>
                            Service Details
                          </h3>
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {service.services[0]?.description || 'Expert service with precision and care.'}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/30">
                              <p className="text-gray-400 text-sm mb-1">Service Duration</p>
                              <p className="text-white font-medium">2-4 Hours</p>
                            </div>
                            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/30">
                              <p className="text-gray-400 text-sm mb-1">Warranty</p>
                              <p className="text-white font-medium">1 Year</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'features' && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <span className="bg-blue-500/20 p-2 rounded-lg mr-3">✨</span>
                            Key Features
                          </h3>
                          <div className="grid grid-cols-1 gap-3">
                            {[
                              "24/7 Emergency Support with 1-hour response time",
                              "Fully Licensed & Certified Professionals",
                              "1-Year Comprehensive Warranty on all work",
                              "Free Initial Consultation and Quote",
                              "Eco-Friendly Materials and Practices",
                              "Transparent Pricing with No Hidden Fees"
                            ].map((item, i) => (
                              <div
                                key={i}
                                className="flex items-start bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-xl transition-all border border-gray-700/30"
                              >
                                <span className="text-blue-400 mr-3 mt-0.5">•</span>
                                <span className="text-gray-200">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {activeTab === 'faq' && (
                        <div>
                          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <span className="bg-blue-500/20 p-2 rounded-lg mr-3">❓</span>
                            Frequently Asked Questions
                          </h3>
                          <div className="space-y-4">
                            {[
                              {
                                question: "What areas do you service?",
                                answer: "We cover all major metropolitan areas within a 50-mile radius of our headquarters."
                              },
                              {
                                question: "How do I schedule an appointment?",
                                answer: "You can book directly through our website, mobile app, or by calling our customer service line."
                              },
                              {
                                question: "What payment methods do you accept?",
                                answer: "We accept all major credit cards, PayPal, and bank transfers. Financing options are also available."
                              }
                            ].map((faq, i) => (
                              <div key={i} className="bg-gray-800/50 rounded-xl border border-gray-700/30 overflow-hidden">
                                <button className="w-full text-left p-4 flex justify-between items-center">
                                  <span className="font-medium text-gray-200">{faq.question}</span>
                                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                                <div className="px-4 pb-4 text-gray-300">
                                  {faq.answer}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Panel */}
              <div className="space-y-8">
                {/* Pricing Card */}
                <div className="bg-gray-800/30 border-2 border-gray-700/30 rounded-3xl p-6 sm:p-8 backdrop-blur-lg shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="bg-blue-500/20 p-2 rounded-lg mr-3">💲</span>
                    Pricing & Booking
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Standard Rate</span>
                      <span className="text-2xl font-bold text-white">${service.services[0]?.price || '99'}</span>
                    </div>
                    
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-blue-300 text-sm">Price includes all materials and labor. No hidden fees.</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center space-x-2"
                      >
                        <span>🛒</span>
                        <span>Add to Cart</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate(-1)}
                        className="w-full px-6 py-3 bg-gray-800/70 text-gray-300 border border-gray-700/50 rounded-xl hover:bg-gray-700/50 transition-all flex items-center justify-center space-x-2"
                      >
                        <span>↩</span>
                        <span>Back to Services</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Service Highlights */}
                <div className="bg-gray-800/30 border-2 border-gray-700/30 rounded-3xl p-6 sm:p-8 backdrop-blur-lg shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="bg-blue-500/20 p-2 rounded-lg mr-3">⚡</span>
                    Why Choose Us
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: "🏆", text: "Award-winning service quality" },
                      { icon: "⏱️", text: "On-time guarantee or it's free" },
                      { icon: "🛡️", text: "Fully insured for your protection" },
                      { icon: "🌱", text: "Eco-friendly practices" },
                      { icon: "💎", text: "Premium materials included" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center bg-gray-800/50 p-3 rounded-lg border border-gray-700/30">
                        <span className="text-2xl mr-3">{item.icon}</span>
                        <span className="text-gray-200">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-16 sm:mt-20 bg-gradient-to-br from-gray-800/40 to-gray-900/60 border-2 border-gray-700/20 rounded-3xl p-6 sm:p-8 backdrop-blur-lg shadow-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-xl">
                    {service.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-green-500 rounded-full p-1 sm:p-2 border-4 border-gray-900">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>

                <div className="flex-1 w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{service.name}</h3>
                  <div className="flex items-center mb-2">
                    {renderStars(averageRating)}
                    <span className="ml-2 text-gray-400 text-sm">
                      ({averageRating.toFixed(1)} / 5 from {reviews.length} reviews)
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">Professional since {new Date(service.createdAt).getFullYear()}</p>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {service.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs sm:text-sm border border-blue-500/30"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-gray-800/50 p-3 sm:p-4 rounded-xl border border-gray-700/30">
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">Contact</p>
                      <p className="text-white font-medium text-sm sm:text-base">{service.phone}</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 sm:p-4 rounded-xl border border-gray-700/30">
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">Email</p>
                      <p className="text-white font-medium text-sm sm:text-base">{service.contactEmail}</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 sm:p-4 rounded-xl border border-gray-700/30">
                      <p className="text-gray-400 text-xs sm:text-sm mb-1">Location</p>
                      <p className="text-white font-medium text-sm sm:text-base">{service.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16 sm:mt-20 bg-gradient-to-br from-gray-800/40 to-gray-900/60 border-2 border-gray-700/20 rounded-3xl p-6 sm:p-8 backdrop-blur-lg shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                  <span className="bg-blue-500/20 p-2 rounded-lg mr-3">💬</span>
                  Customer Reviews
                </h3>
                <button className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 text-sm hover:bg-blue-500/30 transition-all">
                  Write a Review
                </button>
              </div>
              
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <p className="text-gray-400 mb-4">No reviews yet</p>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">Be the first to share your experience with this service provider.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.slice(0, 4).map((review) => (
                    <motion.div
                      key={review._id}
                      whileHover={{ y: -5 }}
                      className="bg-gray-800/50 p-5 sm:p-6 rounded-xl border border-gray-700/30 backdrop-blur-sm hover:bg-gray-700/50 transition-all shadow-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                          {review.user.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <h4 className="text-white font-semibold">{review.user}</h4>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-gray-400 text-xs sm:text-sm">({review.rating}/5)</span>
                          </div>
                        </div>
                        <div className="ml-auto text-gray-500 text-xs">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{review.feedback}</p>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {reviews.length > 4 && (
                <div className="mt-8 text-center">
                  <button className="px-5 py-2.5 bg-gray-800/50 text-gray-300 rounded-lg border border-gray-700/30 text-sm hover:bg-gray-700/50 transition-all flex items-center mx-auto">
                    View All Reviews ({reviews.length})
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default ServiceFullPage;