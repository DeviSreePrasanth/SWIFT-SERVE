// users/user-services/FilterVendors.jsx
import React, { useState } from 'react';

function FilterVendors({ onFilter }) {
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [availability, setAvailability] = useState('');

  const handleFilter = (e) => {
    e.preventDefault();
    const filters = { location, rating, availability };
    // Pass filter data to parent component or trigger API call
    onFilter(filters);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Filter Vendors</h3>
      <form onSubmit={handleFilter} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or area"
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Minimum Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Select Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Select Availability</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}

export default FilterVendors;