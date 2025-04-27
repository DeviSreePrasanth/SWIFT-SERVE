import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VendorExtraDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    businessName: '',
    businessDescription: '',
    licenseNumber: '',
    insuranceDetails: '',
    serviceCategories: [],
    document: null,
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available service categories for home services
  const serviceOptions = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Cleaning',
    'Painting',
    'HVAC',
    'Landscaping',
    'Other',
  ];

  // Pre-fill fullName from localStorage
  useEffect(() => {
    const userName = localStorage.getItem('userName') || '';
    setFormData((prev) => ({ ...prev, fullName: userName }));
  }, []);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.mobileNumber.match(/^\d{10}$/)) newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.match(/^\d{5,6}$/)) newErrors.postalCode = 'Enter a valid postal code (5-6 digits)';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business Name is required';
    if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business Description is required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License Number is required';
    if (!formData.insuranceDetails.trim()) newErrors.insuranceDetails = 'Insurance Details are required';
    if (formData.serviceCategories.length === 0) newErrors.serviceCategories = 'Select at least one service category';
    if (!formData.document) newErrors.document = 'Please upload a supporting document';
    return newErrors;
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle service category checkbox changes
  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedCategories = checked
        ? [...prev.serviceCategories, value]
        : prev.serviceCategories.filter((cat) => cat !== value);
      return { ...prev, serviceCategories: updatedCategories };
    });
    setErrors((prev) => ({ ...prev, serviceCategories: '' }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors((prev) => ({ ...prev, document: 'File size must be less than 5MB' }));
      return;
    }
    if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      setErrors((prev) => ({ ...prev, document: 'Only JPEG, PNG, or PDF files are allowed' }));
      return;
    }
    setFormData((prev) => ({ ...prev, document: file }));
    setErrors((prev) => ({ ...prev, document: '' }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setSubmitMessage('Please log in again.');
        setSubmitMessageType('error');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      // Prepare form data for multipart upload
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'serviceCategories') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'document' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        'http://localhost:5000/api/vendors/details',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setSubmitMessage('Vendor details submitted successfully! Awaiting admin approval.');
        setSubmitMessageType('success');
        localStorage.setItem('profileCompleted', 'true');
        // Reset form data
        setFormData({
          fullName: localStorage.getItem('userName') || '',
          mobileNumber: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          businessName: '',
          businessDescription: '',
          licenseNumber: '',
          insuranceDetails: '',
          serviceCategories: [],
          document: null,
        });
        setTimeout(() => {
          setSubmitMessage('');
          navigate('/approval-waiting');
        }, 1500);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setSubmitMessage('Session expired. Please log in again.');
        setSubmitMessageType('error');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setSubmitMessage(error.response?.data?.message || 'Error submitting details');
        setSubmitMessageType('error');
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Complete Your Vendor Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            Provide detailed information to verify your home services business
          </p>
        </div>

        {submitMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              submitMessageType === 'error'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.fullName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.mobileNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="10-digit number"
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.address ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full address"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.city ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your city"
              />
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.state ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your state"
              />
              {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.postalCode ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="5-6 digits"
              />
              {errors.postalCode && (
                <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.businessName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your business name"
              />
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700">
                Business Description
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                rows={4}
                value={formData.businessDescription}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.businessDescription ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe your services, experience, and specialties"
              />
              {errors.businessDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.businessDescription}</p>
              )}
            </div>

            <div>
              <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                Professional License Number
              </label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                value={formData.licenseNumber}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your license number"
              />
              {errors.licenseNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="insuranceDetails" className="block text-sm font-medium text-gray-700">
                Insurance Details
              </label>
              <input
                id="insuranceDetails"
                name="insuranceDetails"
                type="text"
                value={formData.insuranceDetails}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.insuranceDetails ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter insurance policy details"
              />
              {errors.insuranceDetails && (
                <p className="mt-1 text-sm text-red-600">{errors.insuranceDetails}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Service Categories
              </label>
              <div className="mt-2 grid grid-cols-2 gap-4">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      value={service}
                      checked={formData.serviceCategories.includes(service)}
                      onChange={handleServiceChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
              {errors.serviceCategories && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceCategories}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                Upload Supporting Document (JPEG, PNG, PDF)
              </label>
              <input
                id="document"
                name="document"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.document ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <p className="mt-1 text-sm text-gray-500">
                Upload a license, certificate, or ID proof (max 5MB)
              </p>
              {errors.document && <p className="mt-1 text-sm text-red-600">{errors.document}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </div>
            ) : (
              'Submit for Approval'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorExtraDetails;