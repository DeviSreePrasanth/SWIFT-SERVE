import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServicesByCategory } from '../user-services/api';
import ServiceList from '../user-components/ServiceList';
import { useCart } from '../user-context/CartContext';

function CategoryPage() {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServicesByCategory(category);
        setServices(response.data);
      } catch (error) {
        console.error(`Error fetching ${category} services:`, error);
      }
    };
    fetchServices();
  }, [category]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{category} Services</h1>
      <ServiceList services={services} onAddToCart={addToCart} />
    </div>
  );
}

export default CategoryPage;