import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApprovalWaiting = () => {
  const navigate = useNavigate();
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/auth/status', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { isApproved, isRejected } = response.data;

        if (isRejected) {
          toast.error('Your account request has been rejected.');
          localStorage.clear();
          setTimeout(() => navigate('/login'), 1500);
        } else if (isApproved) {
          navigate('/vendor-dashboard');
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }
    };

    const intervalId = setInterval(checkStatus, 5000);
    checkStatus();

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleRefresh = async () => {
    setCheckingStatus(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/api/auth/status', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { isApproved, isRejected } = response.data;

      if (isRejected) {
        toast.error('Your account request has been rejected.');
        localStorage.clear();
        setTimeout(() => navigate('/login'), 1500);
      } else if (isApproved) {
        navigate('/vendor-dashboard');
      }
    } catch (error) {
      toast.error('Error checking status');
    }
    setCheckingStatus(false);
  };

  const goBackToLogin = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 relative">
      {/* Go Back to Login Button */}
      <button
        onClick={goBackToLogin}
        className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Back to Login
      </button>

      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Approval Pending</h2>
        <p className="text-gray-600 mb-6">
          Your vendor account is under review. Please wait for admin approval.
        </p>
        <button
          onClick={handleRefresh}
          disabled={checkingStatus}
          className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 ${
            checkingStatus ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {checkingStatus ? 'Checking...' : 'Refresh Status'}
        </button>
      </div>
    </div>
  );
};

export default ApprovalWaiting;
