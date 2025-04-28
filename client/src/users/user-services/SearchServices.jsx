// users/user-services/SearchServices.jsx
import React, { useState } from 'react';

function SearchServices({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Pass search query to parent component or trigger API call
      onSearch(query);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Search Services</h3>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for services (e.g., plumbing, electrical)..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchServices;