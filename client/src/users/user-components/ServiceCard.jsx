function ServiceCard({ service, onAddToCart }) {
    return (
      <div className="border rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <p>Category: {service.category}</p>
        <p>Price: ₹{service.price}</p>
        <p>Estimated Time: {service.timeEstimated} hours</p>
        <button
          onClick={() => onAddToCart(service._id)}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    );
  }
  
  export default ServiceCard;