import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VendorBookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('status') || 'all';

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const response = await fetch('http://localhost:5000/api/reservations/merchant/reservations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch reservations');
        const data = await response.json();
        setReservations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const filteredReservations = useMemo(() => {
    return filter === 'all' ? reservations : reservations.filter((r) => r.status === filter);
  }, [reservations, filter]);

  const updateStatus = async (reservationId, status) => {
    try {
      setUpdatingId(reservationId);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(
        `http://localhost:5000/api/reservations/merchant/reservations/${reservationId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update reservation');
      }
      const updatedReservation = await response.json();
      setReservations(
        reservations.map((r) => (r._id === reservationId ? updatedReservation : r))
      );
      setSuccess('Reservation status updated successfully');
      setError(null);
    } catch (error) {
      console.error('Error updating reservation:', error);
      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    navigate(`/vendor-dashboard/bookings?status=${newFilter}`);
  };

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
    <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bookings</h1>
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
          <button
            onClick={() => setSuccess(null)}
            className="ml-4 text-green-900 underline"
          >
            Dismiss
          </button>
        </div>
      )}
      <div className="mb-6">
        <label htmlFor="filter-select" className="sr-only">
          Filter Bookings
        </label>
        <select
          id="filter-select"
          value={filter}
          onChange={handleFilterChange}
          className="w-full sm:w-48 p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter bookings by status"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      {filteredReservations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Booking #{reservation._id}
              </h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Customer:</span>{' '}
                {reservation.customerId?.name || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Contact:</span>{' '}
                {reservation.customerId?.merchantProfile?.mobileNumber || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Address:</span>{' '}
                {reservation.customerId?.merchantProfile?.address || 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Date:</span>{' '}
                {reservation.timeSlot ? reservation.timeSlot.split(' ')[0] : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Time:</span>{' '}
                {reservation.timeSlot ? reservation.timeSlot.split(' ')[1] : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Status:</span>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    reservation.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : reservation.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : reservation.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                  aria-label={`Status: ${reservation.status}`}
                >
                  {reservation.status
                    ? reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)
                    : 'N/A'}
                </span>
              </p>
              <div className="mt-4">
                {reservation.status === 'pending' ? (
                  <button
                    onClick={() => updateStatus(reservation._id, 'confirmed')}
                    disabled={updatingId === reservation._id}
                    className={`w-full py-2 px-4 rounded-lg text-white ${
                      updatingId === reservation._id
                        ? 'bg-green-300 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    aria-label={`Confirm booking ${reservation._id}`}
                  >
                    {updatingId === reservation._id ? 'Confirming...' : 'Confirm'}
                  </button>
                ) : (
                  <select
                    value={reservation.status}
                    onChange={(e) => updateStatus(reservation._id, e.target.value)}
                    disabled={updatingId === reservation._id}
                    className={`w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      updatingId === reservation._id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label={`Update status for booking ${reservation._id}`}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No bookings found for this status.</p>
      )}
    </div>
  );
};

export default VendorBookings;