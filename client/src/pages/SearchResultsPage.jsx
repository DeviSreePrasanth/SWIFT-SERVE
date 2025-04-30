import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';

const SearchResults = () => {
  const [results, setResults] = useState({ services: [], vendors: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { name } = useParams(); // Extract 'name' from URL path

  console.log('Param name:', name); // Debug the name parameter

  useEffect(() => {
    const fetchResults = async () => {
      if (!name || name.trim().length < 2) {
        setError('Please provide a search term with at least 2 characters');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Fetching from:', `/api/search?name=${encodeURIComponent(name)}`);
        const response = await axios.get(`http://localhost:5000/api/search?name=${encodeURIComponent(name)}`);
        console.log('Response data:', response.data);

        setResults({
          services: Array.isArray(response.data.services) ? response.data.services : [],
          vendors: Array.isArray(response.data.vendors) ? response.data.vendors : [],
        });
        console.log('Results set:', results);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(
          err.response?.data?.error ||
          err.message ||
          'Failed to fetch results. Please check your network or try again later.'
        );
        setLoading(false);
      }
    };

    fetchResults();
  }, [name]);

  if (!name) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-12">
        <p className="text-center text-gray-300 text-lg">Please enter a search term.</p>
      </div>
    );
  }

  return (
  <>
  <Header/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-pulse">
            Search Results
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            Showing results for "<span className="font-semibold text-cyan-300">{name}</span>"
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin delay-200"></div>
            </div>
            <span className="text-gray-200 text-lg font-semibold animate-pulse">Exploring the universe...</span>
          </div>
        )}

        {error && (
          <div className="bg-gray-800/40 border-l-4 border-red-500 text-gray-200 p-6 mb-8 rounded-xl backdrop-blur-md shadow-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-white mb-1">Search Error</h3>
                <p className="text-gray-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Services Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <h2 className="text-3xl font-bold text-white">Services</h2>
              <span className="ml-4 px-3 py-1 bg-gray-800/50 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30 backdrop-blur-sm">
                {results.services?.length || 0} found
              </span>
            </div>
            {results.services?.length > 0 && (
              <Link 
                to="/services" 
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center transition-colors"
              >
                View all services
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
          
          {!loading && !error && (!results.services || results.services.length === 0) ? (
            <div className="bg-gray-800/30 rounded-2xl p-12 text-center border border-gray-700/50 backdrop-blur-md shadow-xl">
              <div className="inline-block p-5 bg-gray-900/50 rounded-full mb-6 border border-cyan-500/20">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No matching services</h3>
              <p className="text-gray-300 max-w-md mx-auto">We couldn't find any services matching your search criteria. Try different keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.services.map((service) => (
                <Link
                  to={`/services/${service._id}`}
                  key={service._id}
                  className="group bg-gray-800/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-2 border border-gray-700/50 hover:border-cyan-500/50 backdrop-blur-md"
                >
                  <div className="relative h-56 overflow-hidden">
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                      <div>
                        <span className="inline-block px-4 py-1.5 bg-gray-900/60 backdrop-blur-md rounded-full text-sm font-semibold text-cyan-300 border border-cyan-500/40 mb-3">
                          {service.category || 'Service'}
                        </span>
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{service.name || 'Unnamed Service'}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                      {service.description || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between">
                      {service.price && (
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-cyan-900/40 text-cyan-300 border border-cyan-500/40">
                          ${service.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Vendors Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <h2 className="text-3xl font-bold text-white">Professionals</h2>
              <span className="ml-4 px-3 py-1 bg-gray-800/50 text-cyan-400 text-sm font-medium rounded-full border border-cyan-500/30 backdrop-blur-sm">
                {results.vendors?.length || 0} found
              </span>
            </div>
            {results.vendors?.length > 0 && (
              <Link 
                to="/vendors" 
                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center transition-colors"
              >
                View all professionals
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
          
          {!loading && !error && (!results.vendors || results.vendors.length === 0) ? (
            <div className="bg-gray-800/30 rounded-2xl p-12 text-center border border-gray-700/50 backdrop-blur-md shadow-xl">
              <div className="inline-block p-5 bg-gray-900/50 rounded-full mb-6 border border-cyan-500/20">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No matching professionals</h3>
              <p className="text-gray-300 max-w-md mx-auto">We couldn't find any professionals matching your search criteria. Try different keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.vendors.map((vendor) => (
                <Link
                  to={`/vendor/${vendor._id}`}
                  key={vendor._id}
                  className="group bg-gray-800/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/30 transition-all duration-500 hover:-translate-y-2 border border-gray-700/50 hover:border-cyan-500/50 backdrop-blur-md"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-5">
                        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-5xl font-bold text-white group-hover:ring-4 group-hover:ring-cyan-500/40 transition-all">
                          {vendor.name?.charAt(0) || '?'}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-cyan-500 rounded-full p-2 border-4 border-gray-900">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {vendor.name || 'Unnamed Professional'}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">{vendor.contactEmail}</p>
                      
                      {vendor.categories?.length > 0 && (
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                          {vendor.categories.slice(0, 3).map((category, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-900/60 text-cyan-300 border border-cyan-500/40"
                            >
                              {category}
                            </span>
                          ))}
                          {vendor.categories.length > 3 && (
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-900/60 text-gray-400 border border-gray-700/40">
                              +{vendor.categories.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-900/40 border-t border-gray-700/50">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center text-sm text-gray-300">
                        <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{vendor.address || 'Location not specified'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SearchResults;