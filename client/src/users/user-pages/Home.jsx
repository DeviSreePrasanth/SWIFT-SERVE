import React from 'react';
import { useEffect, useState } from 'react';
import { getServices } from '../user-services/api';
import ServiceList from '../user-components/ServiceList';
import { useCart } from '../user-context/CartContext';

function Home() {
  const [services, setServices] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Services</h1>
      <ServiceList services={services} onAddToCart={addToCart} />
    </div>
  );
}

export default Home;