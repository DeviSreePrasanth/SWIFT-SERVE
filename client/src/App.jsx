import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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

//user routes
import Home from './users/Home'
import SearchServices from './users/user-services/SearchServices';
import ServiceCategory from './users/user-services/ServiceCategory';
import ServiceDetails from './users/user-services/ServiceDetails';
import VendorList from './users/vendors/VendorList';
import VendorProfile1 from './users/vendors/VendorProfile';
import VendorAvailability from './users/vendors/VendorAvailability';
import Cart from './users/cart/Cart';
import Checkout from './users/cart/Checkout';
import BookingHistory from './users/user-services/BookingHistory';
import LeaveReview from './users/user-services/LeaveReview';
import VendorRatings from './users/user-services/VendorRatings';
import FilterVendors from './users/user-services/FilterVendors';
import ServiceListing from "./users/user-services/ServiceListing";

function AppContent() {
  const location = useLocation();

  // Define routes where you want to HIDE the Navbar
  const hideNavbarRoutes = ["/login", "/approval-waiting", "/vendor-dashboard"];

  return (
    <>
      {/* Example Navbar conditional rendering */}
      {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}

      <div className="container mx-auto p-4">
        <Routes>
          {/* Auth and Common Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/approval-waiting" element={<ApprovalWaiting />} />
          <Route path="/extra-details" element={<VendorExtraDetails />} />

          {/* Admin Routes */}
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

          {/* User Routes */}
          <Route path="/home" element={<Home />}>
          <Route index element={<ServiceListing />} />
          <Route path="services" element={<ServiceListing />} />
          <Route path="services/category" element={<ServiceCategory />} />
          <Route path="services/details/:serviceId" element={<ServiceDetails />} /> {/* Added :serviceId */}
          <Route path="vendors" element={<VendorList />} />
          <Route path="vendors/profile/:vendorId" element={<VendorProfile1 />} /> {/* Added :vendorId */}
          <Route path="vendors/availability/:vendorId" element={<VendorAvailability />} /> {/* Added :vendorId */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="bookings/history" element={<BookingHistory />} />
          <Route path="reviews/leave" element={<LeaveReview />} />
          <Route path="reviews/ratings/:vendorId" element={<VendorRatings />} /> {/* Added :vendorId */}
          <Route path="search/services" element={<SearchServices />} />
          <Route path="vendors/filter" element={<FilterVendors />} />
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
