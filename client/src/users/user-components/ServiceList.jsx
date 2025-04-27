import ServiceCard from './ServiceCard';

function ServiceList({ services, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {services.map(service => (
        <ServiceCard key={service._id} service={service} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default ServiceList;