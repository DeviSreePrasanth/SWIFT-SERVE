import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${userId}`);
        setBookings(response.data.bookings || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch bookings: ' + (err.response?.data?.message || err.message));
      }
      setLoading(false);
    };
    if (userId) {
      fetchBookings();
    } else {
      setError('No user ID provided');
      setLoading(false);
    }
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-900 text-green-200';
      case 'pending':
        return 'bg-yellow-900 text-yellow-200';
      case 'cancelled':
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Not specified';
    
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  };

  const getCategoryImage = (category) => {
    // Replace with your actual image paths or API
    const images = {
      'cleaning': '/images/cleaning.jpg',
      'repair': '/images/repair.jpg',
      'beauty': '/images/beauty.jpg',
      'default': '/images/default-service.jpg'
    };
    return images[category?.toLowerCase()] || images.default;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Your Bookings</h1>
            <p className="mt-3 text-lg text-gray-400">
              View all your booked services
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-8">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20">
              <svg
                className="mx-auto h-12 w-12 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-white">No bookings found</h3>
              <p className="mt-1 text-gray-400">You haven't made any bookings yet.</p>
              <div className="mt-6">
                <a
                  href="/services"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Browse Services
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Booking History
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-400">
                  Details of all your booked services
                </p>
              </div>
              <ul className="divide-y divide-gray-700">
                {bookings.map((booking, index) => (
                  <li key={`${booking.vendorId}-${booking.serviceName}-${booking.slot}-${index}`}>
                    <div className="px-4 py-5 sm:px-6 hover:bg-gray-700/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                          <img
                            className="h-24 w-24 rounded-md object-cover border border-gray-600"
                            src={getCategoryImage(booking.category)}
                            alt={booking.serviceName}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-medium text-blue-400">
                              {booking.serviceName}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status || 'N/A'}
                            </span>
                          </div>
                          <div className="mt-2 space-y-2">
                            <p className="text-sm text-gray-300">
                              <span className="font-medium text-gray-100">Vendor:</span> {booking.vendorId?.name || booking.vendorId}
                            </p>
                            <p className="text-sm text-gray-300">
                              <span className="font-medium text-gray-100">Category:</span> {booking.category || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-300">
                              <span className="font-medium text-gray-100">Date & Time:</span> {formatDateTime(booking.slot)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingsPage;