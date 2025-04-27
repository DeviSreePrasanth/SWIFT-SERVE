import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './users/user-context/CartContext';

// User Pages
import Navbar from './users/user-components/Navbar';
import Home from './users/user-pages/Home';
import CategoryPage from './users/user-pages/CategoryPage';
import CartPage from './users/user-pages/CartPage';
import BookingsPage from './users/user-pages/BookingsPage';

// Common Pages
import Login from './pages/Login';
import ApprovalWaiting from './pages/ApprovalWaiting';
// Vendor Pages
import VendorDashboard from './pages/vendor/Vendor';
import VendorProfile from './pages/vendor/VendorProfile';
import VendorHome from './pages/vendor/VendorHome';
import VendorServices from './pages/vendor/VendorServices';
import VendorBookings from './pages/vendor/VendorBookings';
import VendorPayments from './pages/vendor/VendorPayments';
import VendorMessages from './pages/vendor/VendorMessages';
import VendorReviews from './pages/vendor/VendorReviews';
import VendorAnalytics from './pages/vendor/VendorAnalytics';
import VendorSupport from './pages/vendor/VendorSupport';

// Vendor Pages
import VendorDashboard from './pages/vendor/Vendor';
import VendorProfile from './pages/auth/vendor/VendorProfile';
import VendorHome from './pages/auth/vendor/VendorHome';
import VendorServices from './pages/auth/vendor/VendorServices';
import VendorBookings from './pages/auth/vendor/VendorBookings';
import VendorPayments from './pages/auth/vendor/VendorPayments';
import VendorMessages from './pages/auth/vendor/VendorMessages';
import VendorReviews from './pages/auth/vendor/VendorReviews';
import VendorAnalytics from './pages/auth/vendor/VendorAnalytics';
import VendorSupport from './pages/auth/vendor/VendorSupport';

// Optional: Admin pages can be added later

function AppContent() {
  const location = useLocation();

  // Pages where you don't want Navbar (like login, vendor dashboard, etc.)
  const hideNavbarRoutes = ['/login', '/vendor-dashboard', '/approval-waiting'];

  return (
    <>
      {/* Show Navbar only if current route is not in hideNavbarRoutes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <div className="container mx-auto p-4">
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/approval-waiting" element={<ApprovalWaiting />} />
          <Route path="/extra-details" element={<VendorExtraDetails />} />

          {/* Vendor Routes */}
          <Route path="/vendor-dashboard" element={<VendorDashboard />}>
                    <Route path="home" element={<VendorHome />} />
                    <Route path="profile" element={<VendorProfile />} />
                    <Route path="services" element={<VendorServices />} />
                    <Route path="bookings" element={<VendorBookings />} />
                    <Route path="payments" element={<VendorPayments />} />
                    <Route path="messages" element={<VendorMessages />} />
                    <Route path="reviews" element={<VendorReviews />} />
                    <Route path="analytics" element={<VendorAnalytics />} />
                    <Route path="support" element={<VendorSupport />} />
                    <Route path="" element={<VendorHome />} />
                </Route>

          {/* User Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
