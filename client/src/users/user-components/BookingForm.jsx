
import React from 'react';
import { useState } from 'react';

function BookingForm({ onBook }) {
  const [timeSlot, setTimeSlot] = useState('');
  const [vendorId, setVendorId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({ timeSlot, vendorId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Time Slot (YYYY-MM-DD HH:MM)</label>
        <input
          type="text"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          placeholder="e.g., 2025-04-28 10:00"
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">Vendor ID (Temporary)</label>
        <input
          type="text"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          placeholder="e.g., 507f1f77bcf86cd799439012"
          className="border p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Confirm Booking
      </button>
    </form>
  );
}

export default BookingForm;