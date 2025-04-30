import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VendorCard from '../components/VendorCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:5000/api/detail?name=${id}`)
      .then(response => {
        setCategory(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching category:', error);
        setIsLoading(false);
      });
  }, [id]);

  const openPopup = (vendor) => {
    setSelectedVendor(vendor);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedVendor(null);
  };

  const handleAddToCart = (serviceId) => {
    navigate(`/cart/add/${serviceId}`);
  };

  const viewFullDetails = (service) => {
    navigate(`/service/detail/${service._id}`, { state: { service } });
  };

  return (
    <div className="dark bg-gray-900 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Service Providers
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover exceptional service providers in the dark
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
              <svg className="w-16 h-16 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No services available</h3>
            <p className="text-gray-500">We couldn't find any services matching this category.</p>
          </div>
        ) : (
          <div className="flex flex-col space-y-8">
            {category.map((service, index) => (
              <div 
                key={service._id} 
                className={`relative overflow-hidden rounded-3xl shadow-xl ${index % 2 === 0 ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-gray-900 to-gray-800'} border border-gray-800 hover:border-gray-700 transition-all duration-300`}
              >
                <div className={`flex flex-col lg:flex-row ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Image Section */}
                  <div className="lg:w-2/5 relative h-80 lg:h-auto">
                    {service.services.map((i) => (
                      <img
                        key={i._id}
                        src={i.imageUrl}
                        alt={i.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                      />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm font-medium text-blue-300 mb-2 border border-gray-700">
                          {service.services[0]?.category || 'Service'}
                        </span>
                        <h3 className="text-2xl font-bold text-white">{service.services[0]?.name || 'Professional Service'}</h3>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="lg:w-3/5 p-8 lg:p-12">
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-3xl font-bold text-white">{service.name}</h2>
                      <div className="flex space-x-2">
                        {service.categories.map((cat, i) => (
                          <span 
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-blue-300 border border-gray-700"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      {service.services[0]?.description || 'Professional service with attention to detail and customer satisfaction.'}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="flex items-center">
                        <div className="p-3 bg-gray-800 rounded-xl mr-4 border border-gray-700">
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <p className="font-medium text-gray-200">{service.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="p-3 bg-gray-800 rounded-xl mr-4 border border-gray-700">
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v24a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-200">{service.contactEmail}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => viewFullDetails(service)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center border border-blue-500/30"
                      >
                        View Full Details
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => handleAddToCart(service.services[0]?._id)}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center border border-cyan-500/30"
                      >
                        Add to Cart
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                      
                      <a 
                        href={`tel:${service.phone}`} 
                        className="—x-6 py-3 bg-gray-800 text-blue-400 rounded-xl hover:bg-gray-700 transition-all duration-300 flex items-center border border-gray-700"
                      >
                        Call Now
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dark Theme Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-800">
            <button
              onClick={closePopup}
              className="absolute top-6 right-6 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-all duration-300 border border-gray-700"
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