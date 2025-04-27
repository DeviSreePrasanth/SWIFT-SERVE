
import React from 'react';
function BookingItem({ booking }) {
    return (
      <div className="border rounded-lg p-4 shadow-md mb-4">
        <h3 className="text-lg font-semibold">Booking ID: {booking._id}</h3>
        <p>Time Slot: {booking.timeSlot}</p>
        <p>Status: {booking.status}</p>
        <h4 className="mt-2 font-semibold">Services:</h4>
        <ul>
          {booking.services.map((item, index) => (
            <li key={index}>
              {item.service.name} (Qty: {item.quantity}, Price: ₹{item.service.price})
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default BookingItem;