// users/user-services/Booking.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ServiceDetails from './ServiceDetails';
import VendorAvailability from '../../vendors/VendorAvailability';

function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [selectedVendor, setSelectedVendor] = useState('1'); // Example vendor ID
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ serviceId, selectedVendor, selectedSlot });
    navigate('/booking-history');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Book a Service</h2>
      <ServiceDetails serviceId={serviceId} />
      <div className="mt-4">
        <VendorAvailability vendorId={selectedVendor} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={!selectedSlot}
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;