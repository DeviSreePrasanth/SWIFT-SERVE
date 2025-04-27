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
        setVendors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load vendors. Please try again.');
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  // Handle approve/reject actions
  const handleAction = async (vendorId, action) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/vendor-status/${vendorId}`, { status: action });
      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      setSelectedVendor(null);
    } catch (err) {
      setError(`Failed to ${action} vendor. Please try again.`);
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Vendor Approval Dashboard</h2>
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700 font-medium">{error}</div>
        )}
        {loading ? (
          <div className="text-center text-gray-500">Loading vendors...</div>
        ) : vendors.length === 0 ? (
          <div className="text-center text-gray-500">No pending vendors found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Services</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendors.map((vendor) => (
                  <tr key={vendor._id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vendor.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.businessName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vendor.serviceCategories.join(', ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        onClick={() => viewDetails(vendor)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAction(vendor._id, 'approved')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(vendor._id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-3xl max-h-[80vh] overflow-y-auto shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Vendor Details</h3>
            <div className="space-y-4">
              <p><strong className="text-gray-700">Full Name:</strong> {selectedVendor.fullName}</p>
              <p><strong className="text-gray-700">Mobile Number:</strong> {selectedVendor.mobileNumber}</p>
              <p><strong className="text-gray-700">Address:</strong> {selectedVendor.address}, {selectedVendor.city}, {selectedVendor.state} {selectedVendor.postalCode}</p>
              <p><strong className="text-gray-700">Business Name:</strong> {selectedVendor.businessName}</p>
              <p><strong className="text-gray-700">Business Description:</strong> {selectedVendor.businessDescription}</p>
              <p><strong className="text-gray-700">License Number:</strong> {selectedVendor.licenseNumber}</p>
              <p><strong className="text-gray-700">Insurance Details:</strong> {selectedVendor.insuranceDetails}</p>
              <p><strong className="text-gray-700">Service Categories:</strong> {selectedVendor.serviceCategories.join(', ')}</p>
              <p>
                <strong className="text-gray-700">Document:</strong>{' '}
                <a
                  href={`http://localhost:5000/${selectedVendor.document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  View Document
                </a>
              </p>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => handleAction(selectedVendor._id, 'approved')}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(selectedVendor._id, 'rejected')}
                className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Reject
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition duration-200"
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