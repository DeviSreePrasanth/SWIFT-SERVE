import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Shared time slot data (synchronized with VendorBookings)
const sharedTimeSlots = [
  { id: 1, time: '09:00 AM - 10:00 AM', date: '2025-04-28', status: 'available', customer: null },
  { id: 2, time: '10:00 AM - 11:00 AM', date: '2025-04-28', status: 'available', customer: null },
  { id: 3, time: '11:00 AM - 12:00 PM', date: '2025-04-28', status: 'booked', customer: 'Alice Smith' },
  { id: 4, time: '01:00 PM - 02:00 PM', date: '2025-04-28', status: 'available', customer: null },
];

const VendorServices = () => {
  const [timeSlots, setTimeSlots] = useState(sharedTimeSlots);
  const [selectedDate, setSelectedDate] = useState('2025-04-28');
  const [newSlot, setNewSlot] = useState({ time: '', date: '2025-04-28' });
  const [editingSlot, setEditingSlot] = useState(null);

  // Simulate fetching time slots (synchronized with bookings)
  useEffect(() => {
    // In production, fetch from backend
    // fetch(`/api/vendor/time-slots?date=${selectedDate}`)
    //   .then(res => res.json())
    //   .then(data => setTimeSlots(data));
    setTimeSlots(sharedTimeSlots); // Use shared data for demo
  }, [selectedDate]);

  // Add a new time slot
  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.time || !newSlot.date) return;

    const newSlotData = {
      id: timeSlots.length + 1, // Temporary ID
      time: newSlot.time,
      date: newSlot.date,
      status: 'available',
      customer: null,
    };

    sharedTimeSlots.push(newSlotData);
    setTimeSlots([...sharedTimeSlots]);
    setNewSlot({ time: '', date: '2025-04-28' });

    // In production, send to backend
    // fetch('/api/vendor/time-slots', {
    //   method: 'POST',
    //   body: JSON.stringify(newSlotData),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  };

  // Update an existing time slot
  const handleUpdateSlot = (slotId) => {
    const updatedSlot = timeSlots.find(slot => slot.id === slotId);
    if (!updatedSlot.time || !updatedSlot.date) return;

    const updatedSlots = timeSlots.map(slot =>
      slot.id === slotId ? { ...slot, ...updatedSlot } : slot
    );
    sharedTimeSlots.splice(0, sharedTimeSlots.length, ...updatedSlots);
    setTimeSlots(updatedSlots);
    setEditingSlot(null);

    // In production, send update to backend
    // fetch(`/api/vendor/time-slots/${slotId}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(updatedSlot),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  };

  // Delete a time slot
  const handleDeleteSlot = (slotId) => {
    const updatedSlots = timeSlots.filter(slot => slot.id !== slotId);
    sharedTimeSlots.splice(0, sharedTimeSlots.length, ...updatedSlots);
    setTimeSlots(updatedSlots);

    // In production, send delete request
    // fetch(`/api/vendor/time-slots/${slotId}`, {
    //   method: 'DELETE',
    // });
  };

  // Filter slots by selected date
  const filteredSlots = timeSlots.filter(slot => slot.date === selectedDate);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Time Slots</h1>

      {/* Date Selector */}
      <div className="mb-6">
        <label htmlFor="date-select" className="block text-gray-700 font-medium mb-2">
          Select Date
        </label>
        <select
          id="date-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="2025-04-28">April 28, 2025</option>
          <option value="2025-04-29">April 29, 2025</option>
          <option value="2025-04-30">April 30, 2025</option>
        </select>
      </div>

      {/* Add New Time Slot Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Time Slot</h2>
        <form onSubmit={handleAddSlot} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Time (e.g., 09:00 AM - 10:00 AM)"
            value={newSlot.time}
            onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newSlot.date}
            onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Slot
          </button>
        </form>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.length > 0 ? (
          filteredSlots.map(slot => (
            <div
              key={slot.id}
              className={`p-4 rounded-lg shadow-sm border ${
                slot.status === 'available' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              {editingSlot && editingSlot.id === slot.id ? (
                <>
                  <input
                    type="text"
                    value={slot.time}
                    onChange={(e) =>
                      setTimeSlots(
                        timeSlots.map(s =>
                          s.id === slot.id ? { ...s, time: e.target.value } : s
                        )
                      )
                    }
                    className="p-2 border rounded-md w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={slot.date}
                    onChange={(e) =>
                      setTimeSlots(
                        timeSlots.map(s =>
                          s.id === slot.id ? { ...s, date: e.target.value } : s
                        )
                      )
                    }
                    className="p-2 border rounded-md w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleUpdateSlot(slot.id)}
                    className="bg-green-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingSlot(null)}
                    className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="text-lg font-semibold text-gray-800">{slot.time}</p>
                  <p className="text-sm text-gray-600">{slot.date}</p>
                  <p
                    className={`mt-2 font-medium ${
                      slot.status === 'available' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {slot.status === 'available' ? 'Available' : 'Booked'}
                  </p>
                  {slot.status === 'booked' && slot.customer && (
                    <p className="mt-1 text-sm text-gray-700">
                      Booked by: {slot.customer}
                    </p>
                  )}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setEditingSlot(slot)}
                      className="text-yellow-500 hover:text-yellow-600 transition"
                      title="Edit Slot"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Delete Slot"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No time slots available for this date.</p>
        )}
      </div>
    </div>
  );
};

export default VendorServices;