import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminApprovalPage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Fetch pending vendors on mount
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/pending-vendors');
        if (response.data) {
          setVendors(response.data.data);
        } else {
          setError('Failed to load vendors. Please try again.');
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load vendors. Please try again.');
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  // Handle approve/reject actions
  const handleAction = async (vendor, action) => {
    try {
      const response = await axios.put('http://localhost:5000/api/admin/vendor-status', {
        username: vendor.username,
        email: vendor.email,
        status: action,
      });
      if (response.data.success) {
        setVendors(vendors.filter((v) => v._id !== vendor._id));
        setSelectedVendor(null);
      } else {
        setError(response.data.message || `Failed to ${action} vendor. Please try again.`);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${action} vendor. Please try again.`);
    }
  };

  // Open modal with vendor details
  const viewDetails = (vendor) => {
    setSelectedVendor(vendor);
  };

  // Close modal
  const closeModal = () => {
    setSelectedVendor(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Vendor Approval Dashboard</h2>
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700">{error}</div>
        )}
        {loading ? (
          <div className="text-center text-gray-600">Loading vendors...</div>
        ) : vendors.length === 0 ? (
          <div className="text-center text-gray-600">No pending vendors found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.businessName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.serviceCategories.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => viewDetails(vendor)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAction(vendor, 'approved')}
                        className="text-green-600 hover:text-green-800 mr-4"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(vendor, 'rejected')}
                        className="text-red-600 hover:text-red-800"
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
      {selectedVendor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Vendor Details</h3>
            <div className="space-y-4">
              <p><strong>Full Name:</strong> {selectedVendor.fullName}</p>
              <p><strong>Username:</strong> {selectedVendor.username}</p>
              <p><strong>Email:</strong> {selectedVendor.email}</p>
              <p><strong>Mobile Number:</strong> {selectedVendor.mobileNumber}</p>
              <p><strong>Address:</strong> {selectedVendor.address}, {selectedVendor.city}, {selectedVendor.state} {selectedVendor.postalCode}</p>
              <p><strong>Business Name:</strong> {selectedVendor.businessName}</p>
              <p><strong>Business Description:</strong> {selectedVendor.businessDescription}</p>
              <p><strong>License Number:</strong> {selectedVendor.licenseNumber}</p>
              <p><strong>Insurance Details:</strong> {selectedVendor.insuranceDetails}</p>
              <p><strong>Service Categories:</strong> {selectedVendor.serviceCategories.join(', ')}</p>
              <p>
                <strong>Document:</strong>{' '}
                <a
                  href={`/${selectedVendor.document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              </p>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => handleAction(selectedVendor, 'approved')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(selectedVendor, 'rejected')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApprovalPage;