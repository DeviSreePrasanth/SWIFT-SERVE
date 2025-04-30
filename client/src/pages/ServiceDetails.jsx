import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import VendorCard from '../components/VendorCard';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ServiceDetails() {
  const { category, id } = useParams();
  const [vendors, setVendors] = useState([]);
  const [serviceDetail, setServiceDetail] = useState(null);

  useEffect(() => {
    // Fetch vendors based on category
    axios.get(`http://localhost:5000/detail?name=${category}`)
      .then(response => {
        setVendors(response.data);

        // Optionally find the specific service by id (optional, in case you want to highlight it)
        const matchedService = response.data
          .flatMap(vendor => vendor.services)
          .find(service => service._id === id);
        setServiceDetail(matchedService);
      })
      .catch(error => {
        console.error('Error fetching vendor data:', error);
      });
  }, [category, id]);

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Service Details</h2>

        {serviceDetail ? (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <img
              src={serviceDetail.imageUrl}
              alt={serviceDetail.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">{serviceDetail.name}</h3>
            <p className="text-gray-700 mb-2">{serviceDetail.description}</p>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Category: {serviceDetail.category}
            </span>
          </div>
        ) : (
          <p className="text-center">Loading service details...</p>
        )}

        <h3 className="text-xl font-semibold mt-10 mb-4">Vendors Offering This Service</h3>

        {vendors.length === 0 ? (
          <p className="text-center">No vendors found.</p>
        ) : (
          vendors.map(vendor => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))
        )}
      </div>

    </>
  );
}

export default ServiceDetails;
