// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// // Common Pages
// import Login from './pages/auth/Login';
// import ApprovalWaiting from './pages/auth/ApprovalWaiting';
// import VendorExtraDetails from './pages/auth/VendorExtraDetails';

// import AdminDashboard from './pages/admin/AdminDashboard';

// // Vendor Pages
// import VendorDashboard from './pages/vendor/Vendor';
// import VendorProfile from './pages/vendor/VendorProfile';
// import VendorHome from './pages/vendor/VendorHome';
// import VendorServices from './pages/vendor/VendorServices';
// import VendorBookings from './pages/vendor/VendorBookings';
// import VendorPayments from './pages/vendor/VendorPayments';
// import VendorMessages from './pages/vendor/VendorMessages';
// import VendorReviews from './pages/vendor/VendorReviews';
// import VendorAnalytics from './pages/vendor/VendorAnalytics';
// import VendorSupport from './pages/vendor/VendorSupport';


// // // User Pages (commented out as per your request)
// // import Navbar from './users/user-components/Navbar';
// // import Home from './users/user-pages/Home';
// // import CategoryPage from './users/user-pages/CategoryPage';
// // import CartPage from './users/user-pages/CartPage';
// // import BookingsPage from './users/user-pages/BookingsPage';

// function AppContent() {
//   const location = useLocation();

//   // Pages where you don't want Navbar (like login, vendor dashboard, etc.)
//   const hideNavbarRoutes = ['/login', '/vendor-dashboard', '/approval-waiting'];

//   return (
//     <>
//       {/* Show Navbar only if current route is not in hideNavbarRoutes */}
//       {/* {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} */}

//       <div className="container mx-auto p-4">
//         <Routes>
//           {/* Common Routes */}
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/approval-waiting" element={<ApprovalWaiting />} />
//           <Route path="/extra-details" element={<VendorExtraDetails />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />

//           {/* Vendor Routes */}
//           <Route path="/vendor-dashboard" element={<VendorDashboard />}>
//             <Route path="home" element={<VendorHome />} />
//             <Route path="profile" element={<VendorProfile />} />
//             <Route path="services" element={<VendorServices />} />
//             <Route path="bookings" element={<VendorBookings />} />
//             <Route path="payments" element={<VendorPayments />} />
//             <Route path="messages" element={<VendorMessages />} />
//             <Route path="reviews" element={<VendorReviews />} />
//             <Route path="analytics" element={<VendorAnalytics />} />
//             <Route path="support" element={<VendorSupport />} />
//             {/* Default route */}
//             <Route path="" element={<VendorHome />} />
//           </Route>

//           {/* User Routes */}
//         </Routes>
//       </div>
//     </>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminApprovalPage from './pages/admin/AdminApprovalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/approval" element={<AdminApprovalPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;