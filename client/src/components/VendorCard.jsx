import { Link } from 'react-router-dom';

export default function VendorCard({ vendor }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-gray-800 hover:bg-gray-700/80 transition-all duration-300">
      <div className="h-48 bg-gray-700 flex items-center justify-center">
        {vendor.image ? (
          <img 
            src={vendor.image} 
            alt={vendor.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{vendor.name}</h3>
        <p className="text-gray-400 mb-4">{vendor.serviceType || 'Professional Service'}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < (vendor.rating || 0) ? 'text-yellow-400' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-400 text-sm">
            ({vendor.reviewCount || 0} reviews)
          </span>
        </div>

        <div className="flex justify-between items-center">
          <Link 
            to={`/vendor/${vendor._id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            View Profile
          </Link>
          <span className="text-white font-medium">
            ${vendor.hourlyRate || '--'}/hr
          </span>
        </div>
      </div>
    </div>
  );
}