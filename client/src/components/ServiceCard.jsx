import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover"
        />
        {service.popular && (
          <div className="absolute top-2 right-2 bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">{service.icon}</span>
          <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
            {service.category}
          </span>
          <Link 
            to={`/services/${service.id}`}
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;