// users/user-services/ServiceCategory.jsx
import React, { useState } from 'react';

function ServiceCategory({ onCategorySelect }) {
  const categories = [
    { id: 1, name: 'Cleaning', icon: 'fa-broom' },
    { id: 2, name: 'Plumbing', icon: 'fa-wrench' },
    { id: 3, name: 'Electrical', icon: 'fa-bolt' },
    { id: 4, name: 'Painting', icon: 'fa-paint-roller' },
    { id: 5, name: 'Gardening', icon: 'fa-leaf' },
    { id: 6, name: 'HVAC', icon: 'fa-fan' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    onCategorySelect(category.name); // Pass the selected category to the parent component
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Service Categories</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.name
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-800 hover:bg-blue-100'
            } border border-gray-300`}
          >
            <i className={`fas ${category.icon} text-lg`}></i>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ServiceCategory;