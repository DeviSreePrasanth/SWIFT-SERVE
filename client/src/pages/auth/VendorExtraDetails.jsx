import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VendorExtraDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    businessDescription: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const MAX_ERROR_COUNT = 3;

  // Check profileCompleted status and pre-fill fullName
  const checkProfileStatus = async () => {
    const token = localStorage.getItem('authToken');
    console.log('Checking authToken in VendorExtraDetails:', token);
    if (!token) {
      console.error('No token found in localStorage');
      if (errorCount < MAX_ERROR_COUNT) {
        toast.warn('No session found. Retrying...');
        setErrorCount((prev) => prev + 1);
      } else {
        toast.error('Session expired. Please log in again.');
        // Avoid clearing localStorage to preserve token
        setTimeout(() => navigate('/login'), 1500);
      }
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const { role, profileCompleted, name } = response.data;
      if (role !== 'vendor') {
        toast.error('Access denied. Vendor role required.');
        // Avoid clearing localStorage
        setTimeout(() => navigate('/login'), 1500);
        return;
      }
  
      if (profileCompleted) {
        toast.info('Profile already completed.');
        setTimeout(() => navigate('/approval-waiting'), 1500);
        return;
      }
  
      const userName = localStorage.getItem('userName') || name || '';
      setFormData((prev) => ({ ...prev, fullName: userName }));
      setErrorCount(0);
    } catch (error) {
      console.error('Error checking profile status:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
      if (error.response?.status === 401) {
        if (errorCount < MAX_ERROR_COUNT) {
          toast.warn('Session issue detected. Retrying...');
          setErrorCount((prev) => prev + 1);
        } else {
          toast.error('Session expired. Please log in again.');
          // Avoid clearing localStorage
          setTimeout(() => navigate('/login'), 1500);
        }
      } else {
        toast.error('Error verifying profile status. Please try again.');
        setTimeout(() => navigate('/login'), 1500);
      }
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.mobileNumber.match(/^\d{10}$/))
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.postalCode.match(/^\d{5,6}$/))
      newErrors.postalCode = 'Enter a valid postal code (5-6 digits)';
    if (!formData.businessDescription.trim())
      newErrors.businessDescription = 'Business Description is required';
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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
    const toastId = toast.loading('Submitting details...');
    const token = localStorage.getItem('authToken');
    console.log('Submitting with authToken:', token);
    if (!token) {
      toast.update(toastId, {
        render: 'No session found. Please log in again.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      setTimeout(() => navigate('/login'), 1500);
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/vendors/details',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200 && (response.data?.success || response.data?.message?.includes('saved'))) {
        toast.update(toastId, {
          render: 'Profile details saved successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 1500,
        });
        localStorage.setItem('profileCompleted', 'true');
        setFormData({
          fullName: localStorage.getItem('userName') || '',
          mobileNumber: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          businessDescription: '',
        });
        setTimeout(() => {
          navigate('/approval-waiting');
        }, 1500);
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Submission error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      if (error.response?.status === 401) {
        toast.update(toastId, {
          render: 'Session expired. Please log in again.',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
        setTimeout(() => navigate('/login'), 1500);
      } else if (error.response?.status === 404) {
        toast.update(toastId, {
          render: 'Vendor details endpoint not found. Please contact support.',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: error.response?.data?.message || 'Error saving details. Please try again.',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (errorCount <= MAX_ERROR_COUNT) {
      checkProfileStatus();
    }
  }, [errorCount]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Vendor Profile</h2>
          <p className="mt-2 text-sm text-gray-600">Provide your business details to get started</p>
        </div>

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
                aria-invalid={errors.fullName ? 'true' : 'false'}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.fullName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1 text-sm text-red-600">
                  {errors.fullName}
                </p>
              )}
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
                aria-invalid={errors.mobileNumber ? 'true' : 'false'}
                aria-describedby={errors.mobileNumber ? 'mobileNumber-error' : undefined}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.mobileNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="10-digit number"
                pattern="\d{10}"
              />
              {errors.mobileNumber && (
                <p id="mobileNumber-error" className="mt-1 text-sm text-red-600">
                  {errors.mobileNumber}
                </p>
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
                aria-invalid={errors.address ? 'true' : 'false'}
                aria-describedby={errors.address ? 'address-error' : undefined}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.address ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your address"
              />
              {errors.address && (
                <p id="address-error" className="mt-1 text-sm text-red-600">
                  {errors.address}
                </p>
              )}
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
                aria-invalid={errors.city ? 'true' : 'false'}
                aria-describedby={errors.city ? 'city-error' : undefined}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.city ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your city"
              />
              {errors.city && (
                <p id="city-error" className="mt-1 text-sm text-red-600">
                  {errors.city}
                </p>
              )}
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
                aria-invalid={errors.state ? 'true' : 'false'}
                aria-describedby={errors.state ? 'state-error' : undefined}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.state ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your state"
              />
              {errors.state && (
                <p id="state-error" className="mt-1 text-sm text-red-600">
                  {errors.state}
                </p>
              )}
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
                aria-invalid={errors.postalCode ? 'true' : 'false'}
                aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.postalCode ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="5-6 digits"
                pattern="\d{5,6}"
              />
              {errors.postalCode && (
                <p id="postalCode-error" className="mt-1 text-sm text-red-600">
                  {errors.postalCode}
                </p>
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
                aria-invalid={errors.businessDescription ? 'true' : 'false'}
                aria-describedby={errors.businessDescription ? 'businessDescription-error' : undefined}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.businessDescription ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe your business (services, experience, etc.)"
              />
              {errors.businessDescription && (
                <p id="businessDescription-error" className="mt-1 text-sm text-red-600">
                  {errors.businessDescription}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
              'Submit Details'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VendorExtraDetails;