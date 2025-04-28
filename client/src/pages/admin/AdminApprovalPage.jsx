import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheck, FiX, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle, FiFileText } from 'react-icons/fi';

const AdminApprovalPage = () => {
  const [pendingVendors, setPendingVendors] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState('');
  const [viewMode, setViewMode] = useState('pending'); // 'pending' or 'all'

  // Fetch both pending and all vendors on mount
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        // Fetch pending vendors
        const pendingResponse = await axios.get('http://localhost:5000/api/admin/pending-vendors');
        // Fetch all vendors
        const allResponse = await axios.get('http://localhost:5000/api/admin/vendors');

        if (pendingResponse.data.success) {
          setPendingVendors(pendingResponse.data.data);
        } else {
          setError('Failed to load pending vendors. Please try again.');
        }

        if (allResponse.data.success) {
          setAllVendors(allResponse.data.data);
        } else {
          setError((prev) => prev || 'Failed to load all vendors. Please try again.');
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
        // Update pending vendors (remove the processed vendor)
        setPendingVendors(pendingVendors.filter((v) => v._id !== vendor._id));
        // Update all vendors (update status of the vendor)
        setAllVendors(
          allVendors.map((v) =>
            v._id === vendor._id ? { ...v, status: action } : v
          )
        );
        setSelectedVendor(null);
        setSuccessMessage(`Vendor ${action} successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
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
  
  const vendors = viewMode === 'pending' ? pendingVendors : allVendors;
  const headerText = viewMode === 'pending' ? 'Pending Approvals' : 'All Vendors';
  const emptyMessage =
    viewMode === 'pending'
      ? 'No pending vendors'
      : 'No vendors found';
  const emptySubMessage =
    viewMode === 'pending'
      ? 'All vendor applications have been processed.'
      : 'No vendors are registered in the system.';

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = vendors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vendors.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper to get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
              <div className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {headerText}: {vendors.length}
              </div>
            </div>
            {/* View Toggle */}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => {
                  setViewMode('pending');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  viewMode === 'pending'
                    ? 'bg-white text-indigo-600'
                    : 'bg-indigo-700 text-white hover:bg-indigo-800'
                } transition-colors`}
              >
                Pending Vendors
              </button>
              <button
                onClick={() => {
                  setViewMode('all');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  viewMode === 'all'
                    ? 'bg-white text-indigo-600'
                    : 'bg-indigo-700 text-white hover:bg-indigo-800'
                } transition-colors`}
              >
                All Vendors
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Messages */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start">
                <FiAlertCircle className="mt-1 mr-3 flex-shrink-0" />
                <div>{error}</div>
              </div>
            )}
            
            {successMessage && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 flex items-start animate-fade-in">
                <FiCheck className="mt-1 mr-3 flex-shrink-0" />
                <div>{successMessage}</div>
              </div>
            )}

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FiLoader className="animate-spin text-indigo-600 text-4xl mb-4" />
                <p className="text-gray-600">Loading vendors...</p>
              </div>
            ) : vendors.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                  <FiFileText className="w-full h-full" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{emptyMessage}</h3>
                <p className="text-gray-500">{emptySubMessage}</p>
              </div>
            ) : (
              <>
                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentVendors.map((vendor) => (
                        <tr key={vendor._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                                {vendor.fullName.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{vendor.fullName}</div>
                                <div className="text-sm text-gray-500">{vendor.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">{vendor.businessName}</div>
                            <div className="text-sm text-gray-500">{vendor.city}, {vendor.state}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {vendor.serviceCategories.slice(0, 3).map((service, index) => (
                                <span key={index} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                                  {service}
                                </span>
                              ))}
                              {vendor.serviceCategories.length > 3 && (
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                  +{vendor.serviceCategories.length - 3} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusStyle(vendor.status)}`}>
                              {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => viewDetails(vendor)}
                                className="p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                title="View Details"
                              >
                                <FiEye className="h-5 w-5" />
                              </button>
                              {vendor.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleAction(vendor, 'approved')}
                                    className="p-2 rounded-lg text-green-600 hover:text-green-800 hover:bg-green-50 transition-colors"
                                    title="Approve"
                                  >
                                    <FiCheck className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => handleAction(vendor, 'rejected')}
                                    className="p-2 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                                    title="Reject"
                                  >
                                    <FiX className="h-5 w-5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 px-4">
                    <button
                      onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <FiChevronLeft className="mr-2" /> Previous
                    </button>
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => paginate(number)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            currentPage === number ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Next <FiChevronRight className="ml-2" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Vendor Details */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Vendor Application Details</h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Personal Information</h4>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{selectedVendor.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{selectedVendor.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedVendor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile Number</p>
                    <p className="font-medium">{selectedVendor.mobileNumber}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Business Information</h4>
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-medium">{selectedVendor.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Business Description</p>
                    <p className="font-medium">{selectedVendor.businessDescription}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">License Number</p>
                    <p className="font-medium">{selectedVendor.licenseNumber}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Location</h4>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{selectedVendor.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">City/State/Zip</p>
                    <p className="font-medium">
                      {selectedVendor.city}, {selectedVendor.state} {selectedVendor.postalCode}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b pb-2">Services & Documents</h4>
                  <div>
                    <p className="text-sm text-gray-500">Service Categories</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedVendor.serviceCategories.map((service, index) => (
                        <span key={index} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Insurance Details</p>
                    <p className="font-medium">{selectedVendor.insuranceDetails}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Document</p>
                    <a
                      href={`/${selectedVendor.document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline font-medium inline-flex items-center"
                    >
                      <FiFileText className="mr-1" /> View Document
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200 flex justify-end space-x-4">
              {selectedVendor.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleAction(selectedVendor, 'rejected')}
                    className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center"
                  >
                    <FiX className="mr-2" /> Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedVendor, 'approved')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <FiCheck className="mr-2" /> Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApprovalPage;