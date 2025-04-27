import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/user/Home';
import VendorDashboard from './pages/vendor/Vendor';
import ApprovalWaiting from './pages/ApprovalWaiting';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/approval-waiting" element={<ApprovalWaiting />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;