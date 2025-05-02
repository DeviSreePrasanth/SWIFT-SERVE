import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicePage';
import ServiceDetails from './pages/ServiceDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import VendorPage from './pages/VendorPage';
import SearchResults from './pages/SearchResultsPage';
import BookingsPage from './pages/BookingsPage';
import CartPage from './pages/CartPage';
import ServiceFullPage from './pages/Servicefullpge';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/vendor" element={<VendorPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/bookings/:userId" element={<BookingsPage />} />
            <Route path="/searchQuery/:name" element={<SearchResults />}/>
            <Route path="/cart/:userId" element={<CartPage/>}/>
            <Route path="/service/detail/:vendorName/:serviceName" element={<ServiceFullPage />} />
            
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;