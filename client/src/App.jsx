import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/auth/Login';
import ApprovalWaiting from './pages/auth/ApprovalWaiting';
import VendorExtraDetails from './pages/auth/VendorExtraDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminApprovalPage from './pages/admin/AdminApprovalPage';

// Vendor Pages
import VendorDashboard from './pages/vendor/Vendor';
import VendorHome from './pages/vendor/VendorHome';
import VendorProfile from './pages/vendor/VendorProfile';
import VendorServices from './pages/vendor/VendorServices';
import VendorBookings from './pages/vendor/VendorBookings';
import VendorPayments from './pages/vendor/VendorPayments';
import VendorMessages from './pages/vendor/VendorMessages';
import VendorReviews from './pages/vendor/VendorReviews';
import VendorAnalytics from './pages/vendor/VendorAnalytics';
import VendorSupport from './pages/vendor/VendorSupport';

// Optional: If you have a Navbar to show on specific pages
// import Navbar from './components/Navbar'; 

function AppContent() {
  const location = useLocation();

  // Define routes where you want to HIDE the Navbar
  const hideNavbarRoutes = ['/login', '/approval-waiting', '/vendor-dashboard'];

  return (
    <>
      {/* { !hideNavbarRoutes.includes(location.pathname) && <Navbar /> } */}

      <div className="container mx-auto p-4">
        <Routes>
          {/* Auth and Common Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/approval-waiting" element={<ApprovalWaiting />} />
          <Route path="/extra-details" element={<VendorExtraDetails />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/approval" element={<AdminApprovalPage />} />

          {/* Vendor Routes */}
          <Route path="/vendor-dashboard" element={<VendorDashboard />}>
            <Route index element={<VendorHome />} />
            <Route path="home" element={<VendorHome />} />
            <Route path="profile" element={<VendorProfile />} />
            <Route path="services" element={<VendorServices />} />
            <Route path="bookings" element={<VendorBookings />} />
            <Route path="payments" element={<VendorPayments />} />
            <Route path="messages" element={<VendorMessages />} />
            <Route path="reviews" element={<VendorReviews />} />
            <Route path="analytics" element={<VendorAnalytics />} />
            <Route path="support" element={<VendorSupport />} />
          </Route>

          {/* Optional: Add a 404 page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;