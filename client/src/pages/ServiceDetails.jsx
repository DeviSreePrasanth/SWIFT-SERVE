import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import VendorCard from '../components/VendorCard';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ServiceDetails() {
  const { id } = useParams(); // Gets `id` from the route: /service/category/:id
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/service/category/${id}`)
      .then(response => {
        console.log(id);
        setCategory(response.data);
      })
      .catch(error => {
        console.error('Error fetching category:', error);
      });
  }, [id]);

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Service Details</h2>
        
        {category.length === 0 ? (
          <p className="text-center">Loading...</p>
        ) : (
          category.map(service => (
            <div key={service._id} className="bg-white shadow-md rounded-lg p-6 mb-8">
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-700 mb-2">{service.description}</p>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Category: {service.category}
              </span>
            </div>
          ))
        )}
      </div>

      {/* <BookingForm />
      <Footer /> */}
    </>
  );
}

export default ServiceDetails;
