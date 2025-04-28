// users/user-services/BookingHistory.jsx
import React, { useState, useEffect } from 'react';
import ServiceCard from '../user-components/ServiceCard';
import VendorCard from '../user-components/VendorCard';

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulate fetching booking data from backend (replace with API call)
    const mockBookings = [
      { id: 1, service: { name: 'Plumbing', id: 1 }, vendor: { name: 'Vendor A', id: 1 }, date: '2025-04-20', status: 'Completed' },
      { id: 2, service: { name: 'Electrical', id: 2 }, vendor: { name: 'Vendor B', id: 2 }, date: '2025-04-15', status: 'Pending' },
    ];
    setBookings(mockBookings);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border p-4 rounded shadow">
              <ServiceCard service={booking.service} />
              <VendorCard vendor={{ name: booking.vendor.name, id: booking.vendor.id }} />
              <p className="mt-2">Date: {booking.date}</p>
              <p className="mt-1">Status: <span className={booking.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>{booking.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingHistory;