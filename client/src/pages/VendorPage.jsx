import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import VendorCard from '../components/VendorCard';
import Footer from '../components/Footer';
import axios from 'axios';

function VendorPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/vendor');
        setVendors(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError('Failed to load vendors. Please try again later.');
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-blue-500">Trusted Vendors</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional service providers you can rely on
            </p>
          </div>
        </section>

        {/* Vendors Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {loading ? (
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          ) : vendors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vendors.map((vendor) => (
                  <VendorCard key={vendor._id} vendor={vendor} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link 
                  to="/" 
                  className="inline-block px-6 py-2 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No Vendors Available</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We're currently updating our vendor listings. Please check back soon.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default VendorPage;