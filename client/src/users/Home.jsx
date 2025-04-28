import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/home" className="text-2xl font-bold">Service Platform</Link>
      <div className="space-x-4">
        <Link to="/home" className="hover:underline">Home</Link>
        <Link to="/home/services" className="hover:underline">Services</Link>
        <Link to="/home/vendors" className="hover:underline">Vendors</Link>
        <Link to="/home/cart" className="hover:underline">Cart</Link>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ selectedFeature, setSelectedFeature }) => {
  const features = [
    { name: "Search Services", path: "/home/search/services", icon: "🔍" },
    { name: "Services", path: "/home/services", icon: "🛠️" },
    { name: "Vendors", path: "/home/vendors", icon: "👥" },
    { name: "Cart", path: "/home/cart", icon: "🛒" },
    { name: "Checkout", path: "/home/checkout", icon: "💳" },
    { name: "Booking History", path: "/home/bookings/history", icon: "📅" },
    { name: "Leave Review", path: "/home/reviews/leave", icon: "⭐" },
    { name: "Filter Vendors", path: "/home/vendors/filter", icon: "🔎" },
  ];

  return (
    <div className="w-64 bg-gray-100 h-screen p-4 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Features</h2>
      <ul>
        {features.map((feature) => (
          <li key={feature.name} className="mb-2">
            <Link
              to={feature.path}
              className={`flex items-center p-2 rounded ${
                selectedFeature === feature.name
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200"
              }`}
              onClick={() => setSelectedFeature(feature.name)}
            >
              <span className="mr-2">{feature.icon}</span>
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

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} />
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;