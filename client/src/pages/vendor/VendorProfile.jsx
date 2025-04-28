import React, { useState, useEffect } from 'react';

const VendorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    businessDescription: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch('http://localhost:5000/api/merchants/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          mobileNumber: data.merchantProfile?.mobileNumber || '',
          address: data.merchantProfile?.address || '',
          city: data.merchantProfile?.city || '',
          state: data.merchantProfile?.state || '',
          postalCode: data.merchantProfile?.postalCode || '',
          businessDescription: data.merchantProfile?.businessDescription || '',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (e.g., max 5MB) and type
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file');
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email) {
      setError('Name and email are required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profileImage) {
      data.append('profileImage', profileImage);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('http://localhost:5000/api/merchants/profile', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setProfileImage(null);
      setImagePreview(null);
      setSuccess('Profile updated successfully');
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Error: {error}
        <button
          onClick={() => setError(null)}
          className="ml-4 text-blue-500 underline"
        >
          Clear Error
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Vendor Profile</h1>
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
          <button
            onClick={() => setSuccess(null)}
            className="ml-4 text-green-900 underline"
          >
            Dismiss
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Details</h2>
          {profile.merchantProfile?.profileImage ? (
            <img
              src={`http://localhost:5000${profile.merchantProfile.profileImage}`}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 object-cover"
              onError={(e) => (e.target.src = '/default-profile.png')} // Fallback image
            />
          ) : (
            <div className="w-32 h-32 rounded-full mb-4 bg-gray-200 flex items-center justify-center">
              No Image
            </div>
          )}
          <p className="text-sm text-gray-600">
            <span className="font-medium">Name:</span> {profile.name || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {profile.email || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Mobile:</span> {profile.merchantProfile?.mobileNumber || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Address:</span> {profile.merchantProfile?.address || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">City:</span> {profile.merchantProfile?.city || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">State:</span> {profile.merchantProfile?.state || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Postal Code:</span> {profile.merchantProfile?.postalCode || 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Business Description:</span>{' '}
            {profile.merchantProfile?.businessDescription || 'N/A'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                State
              </label>
              <input
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="businessDescription" className="block text-gray-700 font-medium mb-2">
                Business Description
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="profileImage" className="block text-gray-700 font-medium mb-2">
                Profile Image
              </label>
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-md"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="mt-4 w-32 h-32 rounded-full object-cover"
                />
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;