import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-700 to-primary-600 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">HomePro</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => `text-white px-3 py-2 rounded-md font-medium ${isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => `text-white px-3 py-2 rounded-md font-medium ${isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
            >
              Services
            </NavLink>
            <NavLink 
              to="/bookings" 
              className={({ isActive }) => `text-white px-3 py-2 rounded-md font-medium ${isActive ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
            >
              My Bookings
            </NavLink>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            <button className="bg-white text-primary-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;