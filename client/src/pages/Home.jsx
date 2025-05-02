import { useState, useEffect, useRef } from 'react'; // Add useRef
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';

function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [error, setError] = useState(null);
  
  // Create a ref for the Why Choose Us section
  const whyChooseUsRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/service');
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

  // Function to scroll to Why Choose Us section
  const scrollToWhyChooseUs = () => {
    whyChooseUsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
              <button
                className="px-8 py-4 cursor-pointer rounded-lg font-semibold transition-all transform hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                onClick={() => navigate('/services')}
              >
                Book a Service
              </button>
              <button
                className="px-8 py-4 cursor-pointer rounded-lg font-semibold transition-all transform hover:scale-105 bg-transparent border-2 border-gray-300 hover:border-white text-white"
                onClick={scrollToWhyChooseUs} // Updated to scroll to Why Choose Us
              >
                Know More
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section ref={whyChooseUsRef} className="py-20 bg-gray-900"> {/* Add ref here */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Why <span className="text-blue-500">Choose Us</span>
              </h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                We're revolutionizing home services with quality, reliability, and convenience
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Verified Professionals",
                  description: "Every service provider is thoroughly vetted and background checked for your peace of mind.",
                  iconPath: "M5 13l4 4L19 7",
                },
                {
                  title: "On-Time Service",
                  description: "Our professionals arrive when promised or your service is free. We value your time.",
                  iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  title: "Transparent Pricing",
                  description: "No hidden fees. Know exactly what you'll pay before booking any service.",
                  iconPath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                },
                {
                  title: "Satisfaction Guarantee",
                  description: "If you're not happy with the service, we'll make it right or refund your money.",
                  iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                },
              ].map(({ title, description, iconPath }, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                  <p className="text-gray-400">{description}</p>
                </div>
              ))}
            </div>

            {/* Stats with SpotlightCard */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: "10,000+", label: "Happy Customers" },
                { value: "500+", label: "Verified Professionals" },
                { value: "24/7", label: "Customer Support" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map(({ value, label }, idx) => (
                <SpotlightCard
                  key={idx}
                  className="bg-blue-900/30 p-6 rounded-xl border border-gray-700 custom-spotlight-card"
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <div className="text-4xl font-bold text-blue-400 mb-2">{value}</div>
                  <div className="text-gray-400">{label}</div>
                </SpotlightCard>
              ))}
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
      </main>

      <Footer />
    </div>
  );
}

export default Home;