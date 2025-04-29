import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const user = { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' };
  const bookings = [
    { id: 1, service: 'Plumbing', vendor: 'FixIt Co.', date: '2025-05-01T10:00:00Z', status: 'Confirmed' },
    // More mock data
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <img src="/assets/avatar.jpg" alt="Avatar" className="w-24 h-24 rounded-full mx-auto" />
            <h2 className="text-xl font-semibold mt-4 text-center">{user.name}</h2>
            <p className="text-gray-600 text-center">{user.email}</p>
            <p className="text-gray-600 text-center">{user.phone}</p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg">Edit Profile</button>
          </div>
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Service</th>
                  <th className="p-2 text-left">Vendor</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t hover:bg-gray-50">
                    <td className="p-2">{booking.service}</td>
                    <td className="p-2">{booking.vendor}</td>
                    <td className="p-2">{formatDate(booking.date)}</td>
                    <td className="p-2">{booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;