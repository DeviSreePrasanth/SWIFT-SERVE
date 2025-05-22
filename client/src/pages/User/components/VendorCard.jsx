import { Link } from 'react-router-dom';

export default function VendorCard({ vendor, rating }) {
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starType = 'empty';
      if (rating >= i) {
        starType = 'filled';
      } else if (rating >= i - 0.5) {
        starType = 'half';
      }
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 inline-block ${
            starType === 'filled'
              ? 'text-yellow-400'
              : starType === 'half'
              ? 'text-yellow-400'
              : 'text-gray-600'
          }`}
          fill={starType === 'filled' ? 'currentColor' : starType === 'half' ? 'url(#half)' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {starType === 'half' && (
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
          )}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <Link
      to={`/vendor/${vendor._id}`}
      className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 border border-gray-800 hover:border-emerald-400/30 cursor-pointer"
    >
      <div className="relative h-48 bg-gray-700 flex items-center justify-center overflow-hidden">
        {vendor.image ? (
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-gray-500 text-5xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold mr-3">
              {vendor.name?.charAt(0) || '?'}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{vendor.name}</h3>
              <p className="text-emerald-400 text-sm">{vendor.serviceType || 'Professional Service'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex items-center text-yellow-400 mr-2">
            {renderStars(rating || 0)}
          </div>
          <span className="text-gray-400 text-sm">({(rating || 0).toFixed(1)} / 5)</span>
        </div>

        {vendor.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {vendor.categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-emerald-400 border border-gray-700"
              >
                {category}
              </span>
            ))}
            {vendor.categories.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
                +{vendor.categories.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-400 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{vendor.address || 'Location not specified'}</span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-900/50 text-emerald-400 border border-emerald-800">
            ${vendor.hourlyRate || '--'}/hr
          </span>
        </div>
      </div>
    </Link>
  );
}