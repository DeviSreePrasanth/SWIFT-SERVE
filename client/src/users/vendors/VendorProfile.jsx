// users/vendors/VendorProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VendorAvailability from './VendorAvailability';
import LeaveReview from '../user-services/LeaveReview';
import VendorRatings from '../user-services/VendorRatings';

function VendorProfile() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const mockVendors = {
      1: {
        id: 1,
        name: 'Vendor A',
        rating: 4.5,
        services: [
          { id: 1, title: 'Cleaning' },
          { id: 2, title: 'Plumbing' },
        ],
      },
    };
    const selectedVendor = mockVendors[parseInt(vendorId)];
    if (selectedVendor) setVendor(selectedVendor);
  }, [vendorId]);

  if (!vendor) {
    return <div className="container mx-auto p-4 text-red-600">Vendor not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">{vendor.name}'s Profile</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <p className="text-gray-700 mb-2">Rating: <span className="text-yellow-500">{vendor.rating} ★</span></p>
          <h3 className="text-lg font-semibold mb-2">Services Offered</h3>
          <ul className="list-disc pl-5 mb-4">
            {vendor.services.map((service) => (
              <li key={service.id} className="text-gray-700">
                {service.title}
                <button
                  onClick={() => navigate(`/services/details/${service.id}`)}
                  className="ml-2 text-blue-500 hover:underline"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
          <VendorAvailability vendorId={vendorId} />
          <button
            onClick={() => navigate(`/booking/${vendor.services[0]?.id}`)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Service
          </button>
          <div className="mt-6">
            <VendorRatings vendorId={vendorId} />
          </div>
        </div>
        <div className="w-full md:w-1/3">
          <LeaveReview />
        </div>
      </div>
    </div>
  );
}

export default VendorProfile;