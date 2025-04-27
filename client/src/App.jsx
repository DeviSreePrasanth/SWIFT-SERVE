// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Home from './pages/user/Home';
// import VendorDashboard from './pages/vendor/Vendor';
// import ApprovalWaiting from './pages/ApprovalWaiting';
// import { CartProvider } from './user-context/CartContext';
// import Navbar from './user-components/Navbar';
// import Home from './user-pages/Home';
// import CategoryPage from './user-pages/CategoryPage';
// import CartPage from './user-pages/CartPage';
// import BookingsPage from './user-pages/BookingsPage';
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/vendor-dashboard" element={<VendorDashboard />} />
//         <Route path="/approval-waiting" element={<ApprovalWaiting />} />
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


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

          {/* Vendor Routes */}
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />

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
