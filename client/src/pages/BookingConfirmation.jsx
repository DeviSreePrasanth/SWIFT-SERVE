import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { formatDate } from '../utils/formatDate';

function BookingConfirmation() {
  const location = useLocation();
  const { booking } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-green-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
          <div className="text-left space-y-2">
            <p><strong>Service:</strong> {booking.serviceName}</p>
            <p><strong>Vendor:</strong> {booking.vendorName}</p>
            <p><strong>Date & Time:</strong> {formatDate(booking.dateTime)}</p>
            <p><strong>Address:</strong> {booking.address}</p>
            {booking.cost && <p><strong>Total Cost:</strong> ${booking.cost}</p>}
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/profile" className="px-4 py-2 bg-blue-600 text-white rounded-lg">View Profile</Link>
            <Link to="/" className="px-4 py-2 bg-gray-200 rounded-lg">Book Another Service</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BookingConfirmation;