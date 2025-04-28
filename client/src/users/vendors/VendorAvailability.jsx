// users/vendors/VendorAvailability.jsx
import React, { useState, useEffect } from 'react';

function VendorAvailability({ vendorId }) {
  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Simulate fetching availability data from backend (replace with API call)
    const mockAvailability = {
      1: {
        '2025-04-28': ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
        '2025-04-29': ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM'],
      },
    };
    setAvailability(mockAvailability[vendorId] || {});
  }, [vendorId]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const availableSlots = selectedDate ? availability[selectedDate] || [] : [];

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Vendor Availability</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          min="2025-04-28"
          max="2025-04-30"
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      {selectedDate && (
        <div>
          <h4 className="text-md font-medium mb-2">Available Slots</h4>
          {availableSlots.length > 0 ? (
            <ul className="list-disc pl-5">
              {availableSlots.map((slot, index) => (
                <li key={index} className="text-gray-700">{slot}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No available slots for this date.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default VendorAvailability;