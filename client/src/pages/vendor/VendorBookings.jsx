import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Mock user database (replace with backend API in production)
const userDatabase = [
  { id: 1, name: 'Alice Smith', bookings: [] },
  { id: 2, name: 'Bob Johnson', bookings: [] },
  { id: 3, name: 'Charlie Brown', bookings: [] },
];

const VendorBookings = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('status') || 'all';

  const [bookings, setBookings] = useState([
    { id: 1, slotId: 1, customer: 'Alice Smith', service: 'Plumbing', date: '2025-04-28', time: '09:00 AM - 10:00 AM', status: 'new' },
    { id: 2, slotId: 2, customer: 'Bob Johnson', service: 'Electrical', date: '2025-04-28', time: '10:00 AM - 11:00 AM', status: 'confirmed' },
    { id: 3, slotId: 3, customer: 'Charlie Brown', service: 'Cleaning', date: '2025-04-28', time: '11:00 AM - 12:00 PM', status: 'new' },
  ]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  // Mock fetching bookings (replace with backend API)
  useEffect(() => {
    // fetch('http://localhost:3000/api/vendor/bookings')
    //   .then(res => res.json())
    //   .then(data => setBookings(data))
    //   .catch(err => console.error('Error fetching bookings:', err));
    setFilteredBookings(
      filter === 'all' ? bookings : bookings.filter(booking => booking.status === filter)
    );
  }, [bookings, filter]);

  const updateStatus = async (bookingId, status) => {
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, status } : b
    );
    setBookings(updatedBookings);

    if (status === 'confirmed') {
      const booking = bookings.find(b => b.id === bookingId);
      // Update time slot status
      const slotUpdate = {
        id: booking.slotId,
        time: booking.time,
        date: booking.date,
        status: 'booked',
        customer: booking.customer,
      };

      // In production, update time slot in backend
      // await fetch(`http://localhost:3000/api/vendor/time-slots/${booking.slotId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(slotUpdate),
      // });

      // Update user booking history
      const user = userDatabase.find(u => u.name === booking.customer);
      if (user) {
        user.bookings.push({
          bookingId: booking.id,
          slotId: booking.slotId,
          service: booking.service,
          date: booking.date,
          time: booking.time,
          status: 'confirmed',
        });
        // In production, update user bookings in backend
        // await fetch(`http://localhost:3000/api/user/${user.id}/bookings`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(user.bookings[user.bookings.length - 1]),
        // });
      }
    }

    // Update booking status in backend
    // await fetch(`http://localhost:3000/api/vendor/bookings/${bookingId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status }),
    // });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Bookings</h1>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => {
            const newFilter = e.target.value;
            window.history.pushState({}, '', `/vendor-dashboard/bookings?status=${newFilter}`);
            setFilteredBookings(
              newFilter === 'all' ? bookings : bookings.filter(b => b.status === newFilter)
            );
          }}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="new">New</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map(booking => (
            <tr key={booking.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{booking.customer}</td>
              <td className="p-3">{booking.service}</td>
              <td className="p-3">{booking.date}</td>
              <td className="p-3">{booking.time}</td>
              <td className="p-3">{booking.status}</td>
              <td className="p-3">
                {booking.status === 'new' ? (
                  <button
                    onClick={() => updateStatus(booking.id, 'confirmed')}
                    className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition"
                  >
                    Confirm
                  </button>
                ) : (
                  <select
                    value={booking.status}
                    onChange={e => updateStatus(booking.id, e.target.value)}
                    className="p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorBookings;