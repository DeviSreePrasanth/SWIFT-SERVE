function VendorCard({ vendor }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
      
      {vendor.email && (
        <p className="text-gray-600 mb-1">Email: {vendor.email}</p>
      )}

      {vendor.phone && (
        <p className="text-gray-600 mb-3">Phone: {vendor.phone}</p>
      )}

      <div>
        <h4 className="font-semibold text-gray-800 mb-2">Services Offered:</h4>
        <ul className="list-disc list-inside">
          {vendor.services.map(service => (
            <li key={service._id} className="text-gray-700">
              {service.name} – {service.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VendorCard;
