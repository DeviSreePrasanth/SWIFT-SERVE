import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [results, setResults] = useState({ services: [], vendors: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('name');

  useEffect(() => {
    const fetchResults = async () => {
      if (!query || query.trim().length < 2) {
        setError('Please provide a search term with at least 2 characters');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/search?name=${encodeURIComponent(query)}`);
        
        setResults({
          services: Array.isArray(response.data.services) ? response.data.services : [],
          vendors: Array.isArray(response.data.vendors) ? response.data.vendors : [],
        });
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
  }, [query]);

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <p className="text-gray-400">Please enter a search term.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-400 mb-8">
          Search Results for "<span className="text-white">{query}</span>"
        </h1>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse flex space-x-4 items-center">
              <div className="rounded-full bg-emerald-500 h-8 w-8"></div>
              <span className="text-gray-300 text-lg">Searching...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-gray-800 border-l-4 border-red-500 text-gray-200 p-4 mb-8 rounded">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Services Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-200">Services</h2>
            <span className="ml-3 px-2 py-1 bg-gray-700 text-emerald-400 text-xs font-medium rounded-full">
              {results.services?.length || 0}
            </span>
          </div>
          
          {!loading && !error && (!results.services || results.services.length === 0) && (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-400">No services found matching your criteria</p>
            </div>
          )}
          
          {results.services?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.services.map((service) => (
                <Link
                  to={`/services/${service._id}`}
                  key={service._id}
                  className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {service.name || 'Unnamed Service'}
                      </h3>
                      {service.category && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-emerald-400">
                          {service.category}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-gray-400 line-clamp-2">
                      {service.description || 'No description available'}
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-emerald-400">
                          {service.vendor?.name?.charAt(0) || '?'}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-300">
                          {service.vendor?.name || 'Unknown professional'}
                        </p>
                        {service.price && (
                          <p className="text-sm text-emerald-400">
                            ${service.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Vendors Section */}
        <section>
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-200">Professionals</h2>
            <span className="ml-3 px-2 py-1 bg-gray-700 text-emerald-400 text-xs font-medium rounded-full">
              {results.vendors?.length || 0}
            </span>
          </div>
          
          {!loading && !error && (!results.vendors || results.vendors.length === 0) && (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <svg className="w-12 h-12 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-400">No professionals found matching your criteria</p>
            </div>
          )}
          
          {results.vendors?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.vendors.map((vendor) => (
                <Link
                  to={`/vendor/${vendor._id}`}
                  key={vendor._id}
                  className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-3xl font-bold text-emerald-400 mb-4 group-hover:ring-2 group-hover:ring-emerald-500 transition-all">
                        {vendor.name?.charAt(0) || '?'}
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {vendor.name || 'Unnamed Professional'}
                      </h3>
                      {vendor.categories?.length > 0 && (
                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                          {vendor.categories.slice(0, 3).map((category, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-emerald-400">
                              {category}
                            </span>
                          ))}
                          {vendor.categories.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-400">
                              +{vendor.categories.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchResults;