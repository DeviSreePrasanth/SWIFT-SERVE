import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ServiceDetails() {
  const { id } = useParams(); // Gets `id` from the route: /service/category/:id
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/service/category/${id}`);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services. Please try again later.');
        setLoading(false);
      }
    };

    fetchServices();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Service Details</h2>
        
        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : services.length === 0 ? (
          <p className="text-center text-gray-300">No services found for this category.</p>
        ) : (
          services.map(service => (
            <div key={service._id} className="bg-gray-800 shadow-md rounded-lg p-6 mb-8">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2 text-white">{service.name}</h3>
              <p className="text-gray-300 mb-2">{service.description}</p>
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                Category: {service.category}
              </span>
            </div>
          ))
        )}
      </div>

      {services.length > 0 && <BookingForm service={services[0]} />}
      <Footer />
    </div>
  );
}

export default ServiceDetails;