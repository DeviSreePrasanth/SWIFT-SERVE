// users/user-services/ServiceListing.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../user-components/ServiceCard';
import SearchServices from './SearchServices';
import FilterVendors from './FilterVendors';
import ServiceCategory from './ServiceCategory';

const ServiceListing = () => {
  const navigate = useNavigate();

  const initialServices = [
    { id: 1, title: 'Cleaning', description: 'Professional home and office cleaning.', icon: 'fa-broom' },
    { id: 2, title: 'Plumbing', description: 'Expert plumbing solutions.', icon: 'fa-wrench' },
    { id: 3, title: 'Electrical', description: 'Safe electrical services.', icon: 'fa-bolt' },
    { id: 4, title: 'Painting', description: 'High-quality interior and exterior painting.', icon: 'fa-paint-roller' },
    { id: 5, title: 'Gardening', description: 'Lawn care and landscaping.', icon: 'fa-leaf' },
    { id: 6, title: 'HVAC', description: 'Heating and air conditioning services.', icon: 'fa-fan' },
  ];

  const [services, setServices] = useState(initialServices);

  const handleViewDetails = (serviceId) => {
    navigate(`/services/details/${serviceId}`);
  };

  const handleSearch = (query) => {
    const filteredServices = initialServices.filter((service) =>
      service.title.toLowerCase().includes(query.toLowerCase())
    );
    setServices(filteredServices);
  };

  const handleFilter = (filters) => {
    console.log('Filter applied:', filters);
    // Add logic to filter services based on vendor criteria if needed
  };

  const handleCategorySelect = (category) => {
    if (category) {
      const filteredServices = initialServices.filter((service) =>
        service.title.toLowerCase() === category.toLowerCase()
      );
      setServices(filteredServices);
    } else {
      setServices(initialServices); // Reset to all services if no category is selected
    }
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">All Services</h2>
      <div className="mb-6">
        <SearchServices onSearch={handleSearch} />
        <ServiceCategory onCategorySelect={handleCategorySelect} />
        <FilterVendors onFilter={handleFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            onViewDetails={() => handleViewDetails(service.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceListing;