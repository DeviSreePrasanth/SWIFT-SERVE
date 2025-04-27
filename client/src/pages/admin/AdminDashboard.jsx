import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Fetch pending vendors
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          toast.error('Please log in as admin.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/vendors/pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendors(response.data);
        setFilteredVendors(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error(error.response?.data?.message || 'Error fetching vendors');
      }
      setLoading(false);
    };
    fetchVendors();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = vendors.filter((vendor) =>
      vendor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVendors(filtered);
  }, [searchTerm, vendors]);

  // Open modal with vendor details
  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVendor(null);
  };

  // Approve vendor
  const handleApprove = async (vendorId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(
        `http://localhost:5000/api/vendors/${vendorId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      setFilteredVendors(filteredVendors.filter((vendor) => vendor._id !== vendorId));
      toast.success('Vendor approved successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error approving vendor');
    }
  };

  // Reject vendor
  const handleReject = async (vendorId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.patch(
        `http://localhost:5000/api/vendors/${vendorId}/reject`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      setFilteredVendors(filteredVendors.filter((vendor) => vendor._id !== vendorId));
      toast.success('Vendor rejected successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error rejecting vendor');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search vendors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          />
        </div>
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-500 text-center">Loading...</p>
          ) : filteredVendors.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No pending vendor requests</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Business Description</th>
                  <th className="px-6 py ebb4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor._id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{vendor.businessDescription || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(vendor)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for Vendor Details */}
      {isModalOpen && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side: Actions */}
              <div className="md:w-1/3 flex flex-col space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
                <button
                  onClick={() => handleApprove(selectedVendor._id)}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(selectedVendor._id)}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Reject
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-full px-4 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Close
                </button>
              </div>
              {/* Right Side: Details */}
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Vendor Details</h2>
                <div className="space-y-3">
                  <p><strong className="text-gray-700">Full Name:</strong> {selectedVendor.fullName}</p>
                  <p><strong className="text-gray-700">Mobile Number:</strong> {selectedVendor.mobileNumber || 'N/A'}</p>
                  <p><strong className="text-gray-700">Address:</strong> {selectedVendor.address || 'N/A'}</p>
                  <p><strong className="text-gray-700">City:</strong> {selectedVendor.city || 'N/A'}</p>
                  <p><strong className="text-gray-700">State:</strong> {selectedVendor.state || 'N/A'}</p>
                  <p><strong className="text-gray-700">Postal Code:</strong> {selectedVendor.postalCode || 'N/A'}</p>
                  <p><strong className="text-gray-700">Business Description:</strong> {selectedVendor.businessDescription || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default AdminDashboard;