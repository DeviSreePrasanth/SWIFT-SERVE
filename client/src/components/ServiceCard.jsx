import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
        <p className="text-gray-300 mb-4">{service.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {service.category}
          </span>
          <Link 
            to={`/service/${service.category}`}
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
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