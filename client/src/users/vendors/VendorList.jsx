// Example usage in VendorList.jsx
import React, { useState } from 'react';
import FilterVendors from '../user-services/FilterVendors';
import VendorCard from '../user-components/VendorCard';

function VendorList() {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor A', location: 'New York', rating: 4.5 },
    { id: 2, name: 'Vendor B', location: 'Los Angeles', rating: 3.8 },
  ]);

  const handleFilter = (filters) => {
    // Simulate filtering (replace with API call)
    let filteredVendors = [...vendors];
    if (filters.location) {
      filteredVendors = filteredVendors.filter((vendor) =>
        vendor.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.rating) {
      filteredVendors = filteredVendors.filter((vendor) => vendor.rating >= parseFloat(filters.rating));
    }
    // Add availability filter logic here
    setVendors(filteredVendors);
  };

  return (
    <div>
      <FilterVendors onFilter={handleFilter} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

export default VendorList;