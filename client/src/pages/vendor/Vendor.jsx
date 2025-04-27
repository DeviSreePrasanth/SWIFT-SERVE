import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUser, FaTools, FaCalendarAlt, FaDollarSign, FaEnvelope, FaStar, FaChartLine, FaHeadset } from 'react-icons/fa';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [newBookingsCount, setNewBookingsCount] = useState(0);

  // Mock fetching new bookings count (replace with backend API)
  useEffect(() => {
    // Example: Fetch from /api/vendor/bookings?status=new
    const fetchNewBookings = async () => {
      try {
        // Mock data
        const response = await new Promise(resolve => setTimeout(() => resolve({ data: { count: 2 } }), 1000));
        setNewBookingsCount(response.data.count);
      } catch (error) {
        console.error('Error fetching new bookings:', error);
      }
    };
    fetchNewBookings();
    // Uncomment for real backend
    // fetch('http://localhost:3000/api/vendor/bookings?status=new')
    //   .then(res => res.json())
    //   .then(data => setNewBookingsCount(data.count))
    //   .catch(err => console.error('Error fetching new bookings:', err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          SWIFT-SERVE
        </div>
        <nav className="flex-1 p-4">
          <Link
            to="/vendor-dashboard/home"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaChartLine className="mr-2" /> Home
          </Link>
          <Link
            to="/vendor-dashboard/profile"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaUser className="mr-2" /> Profile
          </Link>
          <Link
            to="/vendor-dashboard/services"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaTools className="mr-2" /> Services
          </Link>
          <Link
            to="/vendor-dashboard/bookings"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaCalendarAlt className="mr-2" /> Bookings
          </Link>
          <Link
            to="/vendor-dashboard/payments"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaDollarSign className="mr-2" /> Payments
          </Link>
          <Link
            to="/vendor-dashboard/messages"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaEnvelope className="mr-2" /> Messages
          </Link>
          <Link
            to="/vendor-dashboard/reviews"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaStar className="mr-2" /> Reviews
          </Link>
          <Link
            to="/vendor-dashboard/analytics"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaChartLine className="mr-2" /> Analytics
          </Link>
          <Link
            to="/vendor-dashboard/support"
            className="flex items-center p-2 mb-2 rounded hover:bg-gray-700 transition"
          >
            <FaHeadset className="mr-2" /> Support
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Vendor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/vendor-dashboard/bookings?status=new')}
              className="relative bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              New Bookings
              {newBookingsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {newBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/vendor-dashboard/profile')}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Profile
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;