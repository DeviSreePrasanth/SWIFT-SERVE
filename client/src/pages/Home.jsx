import { useState, useEffect } from 'react';
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <main className="flex-grow">
        <section
          className="relative bg-cover bg-center h-screen max-h-[600px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(https://via.placeholder.com/1920x600)',
          }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>

          <div className="text-center text-white relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in">
              Find <span className="text-blue-400">Trusted</span> Home Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
              Book certified professionals for all your home needs with just a few clicks
            </p>
            <button
              className="mt-6 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 animate-fade-in delay-200 shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Explore Services
            </button>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              Our <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Quality services from verified professionals in your area
            </p>
          </div>

          {loadingServices ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl shadow-sm p-4 h-80 animate-pulse bg-gray-800"
                >
                  <div className="h-40 rounded-lg mb-4 bg-gray-700"></div>
                  <div className="h-6 rounded mb-3 w-3/4 bg-gray-700"></div>
                  <div className="h-4 rounded mb-2 w-full bg-gray-700"></div>
                  <div className="h-4 rounded mb-2 w-2/3 bg-gray-700"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center py-12 text-red-400">{error}</p>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          ) : (
            <p className="text-center py-12 text-gray-400">
              No services available at the moment. Please check back later.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;