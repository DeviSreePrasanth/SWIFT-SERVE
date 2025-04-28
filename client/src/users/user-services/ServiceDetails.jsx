// users/user-services/ServiceDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VendorCard from '../user-components/VendorCard';
import LeaveReview from './LeaveReview';

function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Simulate fetching service data from backend (replace with API call)
    const mockServices = {
      1: { id: 1, title: 'Cleaning', description: 'Professional home and office cleaning.', icon: 'fa-broom' },
      2: { id: 2, title: 'Plumbing', description: 'Expert plumbing solutions.', icon: 'fa-wrench' },
      3: { id: 3, title: 'Electrical', description: 'Safe electrical services.', icon: 'fa-bolt' },
      4: { id: 4, title: 'Painting', description: 'High-quality interior and exterior painting.', icon: 'fa-paint-roller' },
      5: { id: 5, title: 'Gardening', description: 'Lawn care and landscaping.', icon: 'fa-leaf' },
      6: { id: 6, title: 'HVAC', description: 'Heating and air conditioning services.', icon: 'fa-fan' },
    };
    const selectedService = mockServices[parseInt(serviceId)];
    if (selectedService) setService(selectedService);
  }, [serviceId]);

  if (!service) {
    return <div className="container mx-auto p-4 text-red-600">Service not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{service.title} Details</h2>
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <p className="text-gray-700 mb-4"><i className={`fas ${service.icon} mr-2`}></i>{service.description}</p>
          <VendorCard vendor={{ name: 'Sample Vendor', id: 1, rating: 4.5 }} />
          <button
            onClick={() => navigate(`/booking/${service.id}`)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Now
          </button>
        </div>
        <div className="w-1/3">
          <LeaveReview />
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;