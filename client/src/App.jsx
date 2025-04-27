import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Common Pages
import Login from './pages/auth/Login';
import ApprovalWaiting from './pages/auth/ApprovalWaiting';
import VendorExtraDetails from './pages/auth/VendorExtraDetails';

// Admin Pages
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

// Authentication Context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: 'admin' | 'vendor', token: string } or null

  const login = (role) => {
    // Mock login: Replace with actual API call in production
    setUser({ role, token: 'mock-token' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

// Unauthorized Component
const Unauthorized = () => (
  <div className="text-center p-4 text-red-500">Unauthorized Access</div>
);

function AppContent() {
  const location = useLocation();

  // Pages where Navbar should be hidden
  const hideNavbarRoutes = ['/login', '/vendor-dashboard', '/approval-waiting', '/extra-details'];

  return (
    <>
      {/* Conditionally render Navbar (commented out as per original code) */}
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}

      <div className="container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/approval-waiting" element={<ApprovalWaiting />} />
          <Route path="/extra-details" element={<VendorExtraDetails />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/approval"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminApprovalPage />
              </ProtectedRoute>
            }
          />

          {/* Vendor Routes */}
          <Route
            path="/vendor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          >
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
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;