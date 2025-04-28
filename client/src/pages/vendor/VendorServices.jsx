import React, { useState, useEffect, useMemo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const VendorServices = () => {
  const [slotSchedules, setSlotSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2025-04-28');
  const [newSlot, setNewSlot] = useState({ time: '', date: '2025-04-28' });
  const [editingSlot, setEditingSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlotSchedules = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch('http://localhost:5000/api/slot-schedules', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch slot schedules');
        const data = await response.json();
        setSlotSchedules(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching slot schedules:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchSlotSchedules();
  }, []);

  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!newSlot.time || !newSlot.date) {
      setError('Time and date are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('http://localhost:5000/api/slot-schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSlot),
      });
      if (!response.ok) throw new Error('Failed to add slot schedule');
      const addedSlot = await response.json();
      setSlotSchedules([...slotSchedules, addedSlot]);
      setNewSlot({ time: '', date: '2025-04-28' });
      setError(null);
    } catch (error) {
      console.error('Error adding slot schedule:', error);
      setError(error.message);
    }
  };

  const handleUpdateSlot = async (slotId) => {
    const slotToUpdate = slotSchedules.find((slot) => slot._id === slotId);
    if (!slotToUpdate.time || !slotToUpdate.date) {
      setError('Time and date are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`http://localhost:5000/api/slot-schedules/${slotId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ time: slotToUpdate.time, date: slotToUpdate.date }),
      });
      if (!response.ok) throw new Error('Failed to update slot schedule');
      const updatedSlot = await response.json();
      setSlotSchedules(slotSchedules.map((slot) => (slot._id === slotId ? updatedSlot : slot)));
      setEditingSlot(null);
      setError(null);
    } catch (error) {
      console.error('Error updating slot schedule:', error);
      setError(error.message);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(`http://localhost:5000/api/slot-schedules/${slotId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete slot schedule');
      setSlotSchedules(slotSchedules.filter((slot) => slot._id !== slotId));
      setError(null);
    } catch (error) {
      console.error('Error deleting slot schedule:', error);
      setError(error.message);
    }
  };

  // Memoize filtered slots to avoid recalculating on every render
  const filteredSlots = useMemo(
    () => slotSchedules.filter((slot) => slot.date === selectedDate),
    [slotSchedules, selectedDate]
  );

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Error: {error}
        <button
          onClick={() => setError(null)}
          className="ml-4 text-blue-500 underline"
        >
          Clear Error
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Time Slots</h1>
      <div className="mb-6">
        <label htmlFor="date-select" className="block text-gray-700 font-medium mb-2">
          Select Date
        </label>
        <select
          id="date-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select a date for time slots"
        >
          <option value="2025-04-28">April 28, 2025</option>
          <option value="2025-04-29">April 29, 2025</option>
          <option value="2025-04-30">April 30, 2025</option>
        </select>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Time Slot</h2>
        <form onSubmit={handleAddSlot} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="time-input" className="sr-only">
              Time Slot
            </label>
            <input
              id="time-input"
              type="text"
              placeholder="Time (e.g., 09:00 AM - 10:00 AM)"
              value={newSlot.time}
              onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Enter time slot"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="date-input" className="sr-only">
              Date
            </label>
            <input
              id="date-input"
              type="date"
              value={newSlot.date}
              onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select date for time slot"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Slot
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot) => (
            <div
              key={slot._id}
              className={`p-4 rounded-lg shadow-sm border ${
                slot.status === 'available' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              {editingSlot && editingSlot._id === slot._id ? (
                <>
                  <div className="mb-2">
                    <label htmlFor={`edit-time-${slot._id}`} className="sr-only">
                      Edit Time
                    </label>
                    <input
                      id={`edit-time-${slot._id}`}
                      type="text"
                      value={slot.time}
                      onChange={(e) =>
                        setSlotSchedules((prev) =>
                          prev.map((s) => (s._id === slot._id ? { ...s, time: e.target.value } : s))
                        )
                      }
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Edit time slot"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor={`edit-date-${slot._id}`} className="sr-only">
                      Edit Date
                    </label>
                    <input
                      id={`edit-date-${slot._id}`}
                      type="date"
                      value={slot.date}
                      onChange={(e) =>
                        setSlotSchedules((prev) =>
                          prev.map((s) => (s._id === slot._id ? { ...s, date: e.target.value } : s))
                        )
                      }
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Edit date"
                    />
                  </div>
                  <button
                    onClick={() => handleUpdateSlot(slot._id)}
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
                    <p className="mt-1 text-sm text-gray-700">Booked by: {slot.customer}</p>
                  )}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setEditingSlot(slot)}
                      className="text-yellow-500 hover:text-yellow-600 transition"
                      title="Edit Slot"
                      aria-label={`Edit slot for ${slot.time} on ${slot.date}`}
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot._id)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Delete Slot"
                      aria-label={`Delete slot for ${slot.time} on ${slot.date}`}
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