import React from 'react';
import { useEffect, useState } from 'react';
import { createBooking, getBookings } from '../user-services/api';
import BookingForm from '../user-components/BookingForm';
import Bookings from '../user-components/Bookings';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookings('tempUser123');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const handleBook = async ({ timeSlot, vendorId }) => {
    try {
      await createBooking({ userId: 'tempUser123', timeSlot, vendorId });
      const response = await getBookings('tempUser123');
      setBookings(response.data);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Book a Service</h1>
      <BookingForm onBook={handleBook} />
      <Bookings bookings={bookings} />
    </div>
  );
}

export default BookingsPage;