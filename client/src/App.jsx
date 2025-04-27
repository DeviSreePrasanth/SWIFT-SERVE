import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/user/Home';
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

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/approval-waiting" element={<ApprovalWaiting />} />
                <Route path="/" element={<Login />} />
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
            </Routes>
        </Router>
    );
};

export default App;