import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import VendorCard from '../components/VendorCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ServiceDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/detail?name=${id}`)
      .then(response => {setCategory(response.data),
        console.log(id);
      })
      .catch(error => console.error('Error fetching category:', error));
  }, [id]);

  const openPopup = (vendor) => {
    console.log(vendor);
    setSelectedVendor(vendor);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedVendor(null);
  };

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
              {service.services.map((i) => (
                <img
                  key={i._id}
                  src={i.imageUrl}
                  alt={i.name}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              ))}
              <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
              <p className="text-gray-700 mb-2">{service.description}</p>

              <div className='flex items-center justify-between'>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Category: {service.category}
                </span>
                <button
                  onClick={() => openPopup(service)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Vendor Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Modal Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg"
            >
              ✕
            </button>
            <VendorCard vendor={selectedVendor} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default ServiceDetails;
