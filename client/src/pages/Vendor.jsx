import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VendorsByCategory = ({ category }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(category);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/vendor/category/${category}`);
        setVendors(response.data);
      } catch (err) {
        setError('Error fetching vendors.');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [category]);

  if (loading) return <p className="text-center mt-4">Loading vendors...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Vendors in "{category}" Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors.map((vendor) => (
          <div key={vendor._id} className="border rounded-lg shadow-md p-4 bg-white">
            <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
            <p><strong>Email:</strong> {vendor.contactEmail}</p>
            <p><strong>Phone:</strong> {vendor.phone}</p>
            <p><strong>Address:</strong> {vendor.address}</p>
            <p><strong>Services:</strong> {vendor.services?.join(', ')}</p>
            <p><strong>Categories:</strong> {vendor.categories?.join(', ')}</p>
            <p className="text-sm text-gray-500 mt-2">Added on: {new Date(vendor.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsByCategory;
