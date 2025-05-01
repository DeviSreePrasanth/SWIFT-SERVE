import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VendorCard from '../components/VendorCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ratings, setRatings] = useState({});
  const [notification, setNotification] = useState(null);
  const [showViewCart, setShowViewCart] = useState(false);

  // Show notification and auto-hide after delay
  const showNotification = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/detail?name=${id}`)
      .then((response) => {
        console.log('Category data:', response.data);
        setCategory(response.data);
        response.data.forEach((vendor) => {
          vendor.services.forEach((service) => {
            axios
              .get(`http://localhost:5000/api/review?name=${service.name}`)
              .then((res) => {
                const reviews = res.data;
                if (reviews.length > 0) {
                  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                  setRatings((prev) => ({ ...prev, [service._id]: avgRating }));
                } else {
                  setRatings((prev) => ({ ...prev, [service._id]: 0 }));
                }
              })
              .catch((error) => {
                console.error(`Error fetching reviews for ${service.name}:`, error);
                setRatings((prev) => ({ ...prev, [service._id]: 0 }));
              });
          });
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category:', error);
        setIsLoading(false);
      });
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starType = 'empty';
      if (rating >= i) {
        starType = 'filled';
      } else if (rating >= i - 0.5) {
        starType = 'half';
      }
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 inline-block ${
            starType === 'filled'
              ? 'text-yellow-400'
              : starType === 'half'
              ? 'text-yellow-400'
              : 'text-gray-600'
          }`}
          fill={starType === 'filled' ? 'currentColor' : starType === 'half' ? 'url(#half)' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {starType === 'half' && (
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
          />
        </svg>
      );
    }
    return stars;
  };

  const openPopup = (vendor) => {
    setSelectedVendor(vendor);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedVendor(null);
  };

  const handleAddToCart = async (serviceId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      showNotification('Please log in to add items to your cart', true);
      navigate('/login');
      return;
    }

    try {
      const service = category.flatMap((cat) => cat.services).find((s) => s._id === serviceId);
      const vendor = category.find((cat) => cat.services.some((s) => s._id === serviceId));

      if (!service || !vendor) {
        console.error('Service or vendor not found:', { serviceId, service, vendor });
        showNotification('Service or vendor not found', true);
        return;
      }

      const payload = {
        userId,
        vendorId: vendor._id,
        vendorName: vendor.name,
        serviceName: service.name,
        category: service.category,
        price: Number(service.price || service.cost || 0),
        imageUrl: service.imageUrl || '',
      };

      console.log('Adding to cart with payload:', payload);

      const response = await axios.post('http://localhost:5000/api/cart/add', payload);

      console.log('Cart add response:', response.data);
      
      if (response.data.message === 'Service already in cart') {
        showNotification('This service is already in your cart', true);
      } else {
        showNotification(`${service.name} added to cart successfully!`);
        setShowViewCart(true);
      }
    } catch (error) {
      console.error('Error adding to cart:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showNotification('Failed to add item to cart: ' + (error.response?.data?.message || error.message), true);
    }
  };

  // Updated viewFullDetails to match the second code's behavior
  const viewFullDetails = (serviceId) => {
    const service = category.flatMap((cat) => cat.services).find((s) => s._id === serviceId);
    const vendor = category.find((cat) => cat.services.some((s) => s._id === serviceId));

    // Debug: Log the found service and vendor
    console.log('Found service:', service);
    console.log('Found vendor:', vendor);

    if (!service || !vendor) {
      console.error('Service or vendor not found for navigation:', { serviceId, service, vendor });
      showNotification('Service or vendor not found for details', true);
      return;
    }

    navigate(`/service/detail/${serviceId}`, {
      state: {
        category,
        service,
        vendor,
      },
    });
  };

  return (
    <div className="dark bg-gray-900 min-h-screen">
      <Header />
      
      {/* Notification System */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-xl backdrop-blur-sm border ${
              notification.isError 
                ? 'bg-red-600/90 border-red-400/30' 
                : 'bg-green-600/90 border-green-400/30'
            } text-white flex items-center`}
          >
            <svg 
              className={`w-5 h-5 mr-2 ${notification.isError ? 'text-red-200' : 'text-green-200'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={notification.isError ? "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : "M5 13l4 4L19 7"} 
              />
            </svg>
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Cart Floating Button */}
      <AnimatePresence>
        {showViewCart && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/cart/${localStorage.getItem('userId')}`)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center border border-blue-400/30"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              View Cart
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Service Providers
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover exceptional service providers
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full h-12 w-12 bg-gradient-to-r from-blue-900 to-purple-900"></div>
            </div>
          </div>
        ) : category.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 border border-gray-800">
              <svg
                className="w-16 h-16 mx-auto text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No services available</h3>
            <p className="text-gray-500">We couldn't find any services matching this category.</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-8">
            {category.map((vendor, vendorIndex) =>
              vendor.services.map((service, serviceIndex) => (
                <div
                  key={service._id}
                  className={`relative overflow-hidden rounded-3xl shadow-xl ${
                    (vendorIndex + serviceIndex) % 2 === 0
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900'
                      : 'bg-gradient-to-r from-gray-900 to-gray-800'
                  } border border-gray-800 hover:border-gray-700 transition-all duration-300`}
                >
                  <div
                    className={`flex flex-col lg:flex-row ${
                      (vendorIndex + serviceIndex) % 2 === 0 ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className="lg:w-2/5 relative h-80 lg:h-auto">
                      <img
                        src={service.imageUrl || 'https://via.placeholder.com/400'}
                        alt={service.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
                        <div>
                          <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm font-medium text-blue-300 mb-2 border border-gray-700">
                            {service.category || 'Service'}
                          </span>
                          <h3 className="text-2xl font-bold text-white">{service.name || 'Professional Service'}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-3/5 p-8 lg:p-12">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h2 className="text-3xl font-bold text-white">{vendor.name}</h2>
                          <div className="flex items-center mt-2">
                            {renderStars(ratings[service._id] || 0)}
                            <span className="ml-2 text-gray-400 text-sm">
                              ({(ratings[service._id] || 0).toFixed(1)} / 5)
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">
                            Price: ${service.price || service.cost ? Number(service.price || service.cost).toFixed(2) : 'N/A'}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {vendor.categories && vendor.categories.length > 0 ? (
                            vendor.categories.map((cat, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-blue-300 border border-gray-700"
                              >
                                {cat}
                              </span>
                            ))
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-blue-300 border border-gray-700">
                              No Categories
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        {service.description || 'Professional service with attention to detail and customer satisfaction.'}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-center">
                          <div className="p-3 bg-gray-800 rounded-xl mr-4 border border-gray-700">
                            <svg
                              className="w-6 h-6 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Contact</p>
                            <p className="font-medium text-gray-200">{vendor.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="p-3 bg-gray-800 rounded-xl mr-4 border border-gray-700">
                            <svg
                              className="w-6 h-6 text-blue-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v24a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-200">{vendor.contactEmail}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => viewFullDetails(service._id)} // Updated to pass service._id
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center border border-blue-500/30 cursor-pointer"
                        >
                          View Full Details
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleAddToCart(service._id)}
                          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center border border-cyan-500/30 cursor-pointer"
                        >
                          Add to Cart
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                        </button>

                        <a
                          href={`tel:${vendor.phone}`}
                          className="px-6 py-3 bg-gray-800 text-blue-400 rounded-xl hover:bg-gray-700 transition-all duration-300 flex items-center border border-gray-700 cursor-pointer"
                        >
                          Call Now
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-800">
            <button
              onClick={closePopup}
              className="absolute top-6 right-6 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 border border-gray-700 cursor-pointer"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <VendorCard vendor={selectedVendor} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ServiceDetails;