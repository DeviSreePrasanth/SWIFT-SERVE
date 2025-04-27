
import React from 'react';
import BookingItem from './BookingItem';

function Bookings({ bookings }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map(booking => (
          <BookingItem key={booking._id} booking={booking} />
        ))
      )}
    </div>
  );
}

export default Bookings;