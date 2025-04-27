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
        if (!token) throw new Error('No auth token found');

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
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      await axios.patch(`http://localhost:5000/api/vendors/${vendorId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      await axios.patch(`http://localhost:5000/api/vendors/${vendorId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      setFilteredVendors(filteredVendors.filter((vendor) => vendor._id !== vendorId));
      toast.success('Vendor rejected successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error rejecting vendor');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search vendors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : filteredVendors.length === 0 ? (
          <p className="text-gray-600">No pending vendor requests</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {vendor.vendorProfile?.businessDescription || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(vendor)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleApprove(vendor._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(vendor._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Vendor Details */}
      {isModalOpen && selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Vendor Details</h2>
            <p><strong>Name:</strong> {selectedVendor.name}</p>
            <p><strong>Email:</strong> {selectedVendor.email}</p>
            <p><strong>Mobile:</strong> {selectedVendor.vendorProfile?.mobileNumber || 'N/A'}</p>
            <p><strong>Profession:</strong> {selectedVendor.vendorProfile?.businessDescription || 'N/A'}</p>
            <p><strong>Address:</strong> {selectedVendor.vendorProfile?.address || 'N/A'}</p>
            <p><strong>City:</strong> {selectedVendor.vendorProfile?.city || 'N/A'}</p>
            <p><strong>State:</strong> {selectedVendor.vendorProfile?.state || 'N/A'}</p>
            <p><strong>Postal Code:</strong> {selectedVendor.vendorProfile?.postalCode || 'N/A'}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;