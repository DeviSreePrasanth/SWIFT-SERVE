import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';
import axios from 'axios';

function Home() {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/service');
        setServices(response.data);
        setLoadingServices(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services. Please try again later.');
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // Get first 6 services only
  const displayedServices = services.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center h-screen max-h-[800px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/70 to-gray-950/60 z-0"></div>

          <div className="text-center text-white relative z-10 px-4 max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in leading-tight">
              Premium <span className="text-blue-500">Home Services</span> <br />On Demand
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in delay-100 text-gray-300">
              Connect with certified professionals for all your home maintenance and repair needs
            </p>
            <div className="flex gap-4 justify-center animate-fade-in delay-200">
              <button className="px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl">
                Book a Service
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 bg-transparent border-2 border-gray-300 hover:border-white text-white">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our <span className="text-blue-500">Premium Services</span>
            </h2>
            <div className="w-95 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Professional solutions for every corner of your home
            </p>
          </div>

          {loadingServices ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl shadow-lg p-6 h-96 animate-pulse bg-gray-800/50"
                >
                  <div className="h-48 rounded-lg mb-6 bg-gray-700"></div>
                  <div className="h-6 rounded mb-4 w-3/4 bg-gray-700"></div>
                  <div className="h-4 rounded mb-2 w-full bg-gray-700"></div>
                  <div className="h-4 rounded mb-2 w-2/3 bg-gray-700"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Loading Error</h3>
              <p className="text-gray-400 max-w-md mx-auto">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              >
                Retry
              </button>
            </div>
          ) : displayedServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedServices.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
              {services.length > 6 && (
                <div className="text-center mt-12">
                  <Link 
                    to="/services" 
                    className="inline-block px-8 py-3 rounded-lg font-semibold bg-transparent border-2 border-blue-500 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View All Services
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No Services Available</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We're currently updating our service offerings. Please check back soon.
              </p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust our professionals for their home service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-lg hover:shadow-xl">
                Get Started Now
              </button>
              <button className="px-8 py-4 rounded-lg font-semibold bg-transparent border-2 border-gray-600 hover:border-white text-white transition-colors">
                Contact Our Team
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;