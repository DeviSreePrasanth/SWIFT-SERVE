import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';
import BookingConfirmation from './pages/BookingConfirmation';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        {/* <Header /> */}

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;