import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import ApprovalWaiting from "./pages/auth/ApprovalWaiting";
import VendorExtraDetails from "./pages/auth/VendorExtraDetails";

// Admin Pages
import AdminApprovalPage from "./pages/admin/AdminApprovalPage";

// Vendor Pages
import VendorDashboard from "./pages/vendor/Vendor";
import VendorHome from "./pages/vendor/VendorHome";
import VendorProfile from "./pages/vendor/VendorProfile";
import VendorServices from "./pages/vendor/VendorServices";
import VendorBookings from "./pages/vendor/VendorBookings";
import VendorPayments from "./pages/vendor/VendorPayments";
import VendorMessages from "./pages/vendor/VendorMessages";
import VendorReviews from "./pages/vendor/VendorReviews";
import VendorAnalytics from "./pages/vendor/VendorAnalytics";
import VendorSupport from "./pages/vendor/VendorSupport";

// User Routes and Context
import { CartProvider } from "./pages/User/context/CartContext";
import ErrorBoundary from "./pages/User/components/ErrorBoundary";
import Home from "./pages/User/pages/Home";
import ServicesPage from "./pages/User/pages/ServicePage";
import ServiceDetails from "./pages/User/pages/ServiceDetails";
import VendorPage from "./pages/User/pages/VendorPage";
import SearchResults from "./pages/User/pages/SearchResultsPage";
import BookingsPage from "./pages/User/pages/BookingsPage";
import CartPage from "./pages/User/pages/CartPage";
import ServiceFullPage from "./pages/User/pages/Servicefullpge";

// New layout component to wrap user routes with context and error boundary
function UserLayout() {
  return (
    <CartProvider>
      <ErrorBoundary>
        <div className="flex-1">
          <Outlet />
        </div>
      </ErrorBoundary>
    </CartProvider>
  );
}

function AppContent() {
  const location = useLocation();

  // Define routes where you want to hide Navbar (optional)
  const hideNavbarRoutes = ["/login", "/approval-waiting", "/vendor-dashboard"];

  return (
    <>
      {/* Optional Navbar: show only if not in hideNavbarRoutes */}
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}

      <div className="container mx-auto p-4 min-h-screen flex flex-col">
        <Routes>
          {/* Auth and Common Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/approval-waiting" element={<ApprovalWaiting />} />
          <Route path="/extra-details" element={<VendorExtraDetails />} />

          {/* Admin Routes */}
          <Route path="/admin/approval" element={<AdminApprovalPage />} />

          {/* Vendor Routes (nested) */}
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

          {/* User Routes wrapped with UserLayout (CartProvider + ErrorBoundary) */}
          <Route element={<UserLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/vendor" element={<VendorPage />} />
            <Route path="/bookings/:userId" element={<BookingsPage />} />
            <Route path="/searchQuery/:name" element={<SearchResults />} />
            <Route path="/cart/:userId" element={<CartPage />} />
            <Route
              path="/service/detail/:vendorName/:serviceName"
              element={<ServiceFullPage />}
            />
          </Route>
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
