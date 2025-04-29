import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import VendorCard from '../components/VendorCard';
import Footer from '../components/Footer';
import { services } from '../data/services';
import { vendors as vendorsData } from '../data/vendors'; // Assuming vendors data is imported correctly

function Home() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // If vendorsData is not an array or empty, it sets an empty array to prevent errors
    if (Array.isArray(vendorsData) && vendorsData.length > 0) {
      setVendors(vendorsData);
    } else {
      console.error("Vendors data is not available or incorrect format.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-cover bg-center h-96 flex items-center justify-center" style={{ backgroundImage: 'url(/assets/hero-bg.jpg)' }}>
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Find Trusted Home Services</h1>
            <p className="mt-4 text-lg">Book plumbers, electricians, cleaners, and more.</p>
            <button className="mt-6 px-6 py-3 bg-blue-600 rounded-lg">Explore Services</button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 px-4 md:px-8">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Vendors Section */}
        <section className="py-12 px-4 md:px-8 bg-gray-100">
          <h2 className="text-3xl font-semibold text-center mb-8">Top Vendors</h2>
          <div className="flex overflow-x-auto gap-4">
            {/* Ensure vendors is an array before trying to map */}
            {Array.isArray(vendors) && vendors.length > 0 ? (
              vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))
            ) : (
              <p>No vendors available at the moment.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
