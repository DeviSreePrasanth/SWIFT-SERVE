import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Swift Serve</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/category/Salon" className="text-white hover:text-gray-200">Salon</Link>
          <Link to="/category/Spa" className="text-white hover:text-gray-200">Spa</Link>
          <Link to="/cart" className="text-white hover:text-gray-200">Cart</Link>
          <Link to="/bookings" className="text-white hover:text-gray-200">Bookings</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;