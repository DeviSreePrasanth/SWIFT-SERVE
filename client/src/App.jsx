import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicePage';
import ServiceDetails from './pages/ServiceDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import Profile from './pages/Profile';
import VendorPage from './pages/VendorPage';

import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/vendor" element={<VendorPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/cart/:userId" element={<CartPage/>}/>
          </Routes>
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;