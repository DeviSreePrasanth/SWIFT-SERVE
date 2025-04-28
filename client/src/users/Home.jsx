import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  FiHome, 
  FiSearch, 
  FiSettings, 
  FiUsers, 
  FiShoppingCart,
  FiCalendar,
  FiStar,
  FiFilter,
  FiLayers,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => (
  <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-2xl focus:outline-none"
        >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <Link to="/home" className="text-2xl font-bold flex items-center">
          <FiLayers className="mr-2" />
          <span>ServiceHub</span>
        </Link>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link to="/home/cart" className="hover:underline flex items-center">
          <FiShoppingCart className="mr-1" /> Cart
        </Link>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ selectedFeature, setSelectedFeature, isSidebarOpen }) => {
  const features = [
    { name: "Search Services", path: "/home/search/services", icon: <FiSearch /> },
    { name: "Services", path: "/home/services", icon: <FaTools /> },
    { name: "Vendors", path: "/home/vendors", icon: <FiUsers /> },
    { name: "Cart", path: "/home/cart", icon: <FiShoppingCart /> },
    { name: "Booking History", path: "/home/bookings/history", icon: <FiCalendar />},
  ];

  return (
    <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white h-screen p-4 shadow-lg transform transition-transform duration-300 ease-in-out`}>
      <h2 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2 flex items-center">
        <FiSettings className="mr-2" />
        Dashboard Features
      </h2>
      <ul>
        {features.map((feature) => (
          <li key={feature.name} className="mb-1">
            <Link
              to={feature.path}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                selectedFeature === feature.name
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
              onClick={() => setSelectedFeature(feature.name)}
            >
              <span className="mr-3 text-lg">{feature.icon}</span>
              {feature.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home = () => {
  const [selectedFeature, setSelectedFeature] = useState("Search Services");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedFeature={selectedFeature} 
          setSelectedFeature={setSelectedFeature} 
          isSidebarOpen={isSidebarOpen}
        />
        <div className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;