const VendorCard = ({ vendor, onSelect }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:border-primary-300 transition">
        <div className="p-4 flex items-start space-x-4">
          <div className="flex-shrink-0">
            <img 
              src={vendor.image} 
              alt={vendor.name} 
              className="h-16 w-16 rounded-full object-cover border-2 border-primary-200"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 truncate">{vendor.name}</h3>
            
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-gray-600">{vendor.rating}</span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-gray-600">{vendor.reviews} reviews</span>
              </div>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {vendor.services.slice(0, 3).map((service, index) => (
                <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <button
              onClick={() => onSelect(vendor)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default VendorCard;