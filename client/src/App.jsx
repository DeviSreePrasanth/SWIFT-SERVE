import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/user/Home';
import VendorDashboard from './pages/vendor/Vendor';
import ApprovalWaiting from './pages/auth/ApprovalWaiting';
import VendorExtraDetails from './pages/auth/VendorExtraDetails';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/approvalwaiting" element={<ApprovalWaiting />} />
        <Route path="/vendor-extra-details" element={<VendorExtraDetails />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;