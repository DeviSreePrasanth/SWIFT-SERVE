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
    businessDescription: '',
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill fullName from localStorage
  useEffect(() => {
    const userName = localStorage.get

Item('userName') || '';
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
    if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business Description is required';
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
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setSubmitMessage('Please log in again.');
        setSubmitMessageType('error');
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/vendor/details',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setSubmitMessage('Profile details saved successfully!');
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
          businessDescription: '',
        });
        setTimeout(() => {
          setSubmitMessage(''); // Clear message before navigation
          navigate('/approval-waiting');
        }, 1000);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setSubmitMessage('Session expired. Please log in again.');
        setSubmitMessageType('error');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setSubmitMessage(error.response?.data?.message || 'Error saving details');
        setSubmitMessageType('error');
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Complete Your Vendor Profile</h2>
          <p className="mt-2 text-sm text-gray-600">
            Provide your business details to get started
          </p>
        </div>

        {submitMessage && (
          <div
            className={`mb-6 p-4 rounded-lg transition-opacity duration-300 ${
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