// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import Footer from '../components/Footer';
import { services as servicesData } from '../data/services';
import { vendors as vendorsData } from '../data/vendors';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem('darkMode') === 'true' ||
      (!localStorage.getItem('darkMode') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};

function Home() {
  const [services, setServices] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  useEffect(() => {
    setTimeout(() => {
      setServices(servicesData);
      setLoadingServices(false);
    }, 1000);

    setTimeout(() => {
      setVendors(vendorsData);
      setLoadingVendors(false);
    }, 1000);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode ? 'dark bg-gray-900' : 'bg-blue-50'
      }`}
    >
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <main className="flex-grow">
        <section
          className="relative bg-cover bg-center h-screen max-h-[600px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(https://via.placeholder.com/1920x600)',
          }}
        >
          <div
            className={`absolute inset-0 ${
              isDarkMode ? 'bg-black/60' : 'bg-blue-900/30'
            } z-0`}
          ></div>

          <div className="text-center text-white relative z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in">
              Find <span className="text-blue-400">Trusted</span> Home Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in delay-100">
              Book certified professionals for all your home needs with just a few
              clicks
            </p>
            <button
              className={`mt-6 px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 animate-fade-in delay-200 shadow-lg ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-xl'
              }`}
            >
              Explore Services
            </button>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-extrabold mb-4 ${
                isDarkMode ? 'text-white' : 'text-blue-900'
              }`}
            >
              Our <span className="text-blue-600">Services</span>
            </h2>
            <p
              className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } max-w-2xl mx-auto`}
            >
              Quality services from verified professionals in your area
            </p>
          </div>

          {loadingServices ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-2xl shadow-sm p-4 h-80 animate-pulse ${
                    isDarkMode ? 'bg-gray-800' : 'bg-blue-100/50'
                  }`}
                >
                  <div
                    className={`h-40 rounded-lg mb-4 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-200/70'
                    }`}
                  ></div>
                  <div
                    className={`h-6 rounded mb-3 w-3/4 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-200/70'
                    }`}
                  ></div>
                  <div
                    className={`h-4 rounded mb-2 w-full ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-200/70'
                    }`}
                  ></div>
                  <div
                    className={`h-4 rounded mb-2 w-2/3 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-200/70'
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          ) : (
            <p
              className={`text-center py-12 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              No services available at the moment. Please check back later.
            </p>
          )}
        </section>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default Home;