import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApprovalWaiting = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const [errorCount, setErrorCount] = useState(0);
  const MAX_ERROR_COUNT = 3;

  const checkApprovalStatus = async () => {
    const token = localStorage.getItem('authToken');
    console.log('Checking authToken in ApprovalWaiting:', token);
    if (!token) {
      console.error('No token found in localStorage');
      if (errorCount < MAX_ERROR_COUNT) {
        toast.warn('No session found. Retrying...');
        setErrorCount((prev) => prev + 1);
      } else {
        toast.error('Session expired. Please log in again.');
        localStorage.clear();
        setTimeout(() => navigate('/login'), 1500);
      }
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/auth/status', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { isApproved, role } = response.data;
      if (role !== 'vendor') {
        toast.error('Access denied. Vendor role required.');
        localStorage.clear();
        setTimeout(() => navigate('/login'), 1500);
        return;
      }

      setStatus(isApproved ? 'approved' : 'pending');
      setErrorCount(0); // Reset error count on success

      if (isApproved) {
        toast.success('Your account has been approved!');
        setTimeout(() => navigate('/vendor-dashboard'), 1500);
      }
    } catch (error) {
      console.error('Error checking approval status:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      if (error.response?.status === 401) {
        if (errorCount < MAX_ERROR_COUNT) {
          toast.warn('Session issue detected. Retrying...');
          setErrorCount((prev) => prev + 1);
        } else {
          toast.error('Session expired. Please log in again.');
          localStorage.clear();
          setTimeout(() => navigate('/login'), 1500);
        }
      } else {
        toast.error('Error checking status. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (errorCount <= MAX_ERROR_COUNT) {
      checkApprovalStatus();
      const interval = setInterval(checkApprovalStatus, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [errorCount]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Awaiting Approval</h2>
        <p className="mt-4 text-sm text-gray-600">
          Your vendor profile is under review. You will be notified once approved.
        </p>
        <div className="mt-6">
          <div className="flex justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="mt-4 text-sm text-gray-500">Status: {status.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default ApprovalWaiting;