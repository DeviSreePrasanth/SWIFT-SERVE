import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApprovalWaiting = () => {
  const navigate = useNavigate();
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [status, setStatus] = useState('pending');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('No authentication token found. Please log in again.');
        localStorage.clear();
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/status', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { isApproved, isRejected } = response.data;

        if (isRejected) {
          setStatus('rejected');
          toast.error('Your account request has been rejected.');
          localStorage.clear();
          setCountdown(5);
          const timeout = setTimeout(() => navigate('/login'), 5000);
          return () => clearTimeout(timeout);
        } else if (isApproved) {
          setStatus('approved');
          toast.success('Your account has been approved! Redirecting...');
          navigate('/vendor-dashboard');
        } else {
          setStatus('pending');
        }
      } catch (error) {
        console.error('Error checking status:', error.response?.data || error.message);
        toast.error('Failed to check status. Please try again.');
      }
    };

    const intervalId = setInterval(checkStatus, 15000); // Check every 15 seconds instead of 1.5
    checkStatus();

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleRefresh = async () => {
    setCheckingStatus(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('No authentication token found. Please log in again.');
      localStorage.clear();
      navigate('/login');
      setCheckingStatus(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/auth/status', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { isApproved, isRejected } = response.data;

      if (isRejected) {
        setStatus('rejected');
        toast.error('Your account request has been rejected.');
        localStorage.clear();
        setCountdown(5);
        setTimeout(() => navigate('/login'), 5000);
      } else if (isApproved) {
        setStatus('approved');
        toast.success('Your account has been approved!');
        navigate('/vendor-dashboard', { replace: true });
      } else {
        setStatus('pending');
        toast.info('Your application is still pending approval.');
      }
    } catch (error) {
      console.error('Error refreshing status:', error.response?.data || error.message);
      toast.error('Failed to refresh status. Please try again.');
    }
    setCheckingStatus(false);
  };

  const goBackToLogin = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative p-4">
      {/* Go Back to Login Button */}
      <button
        onClick={goBackToLogin}
        className="absolute top-6 left-6 flex items-center gap-2 bg-white text-red-500 px-4 py-2 rounded-full shadow-md hover:bg-red-50 transition duration-200 border border-red-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Login
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100 transform hover:shadow-2xl transition duration-300">
        <div className="mb-6 flex justify-center">
          {status === 'pending' && (
            <div className="animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          {status === 'approved' && (
            <div className="animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          {status === 'rejected' && (
            <div className="animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Vendor Application Status</h2>
        <p className="text-gray-600 mb-6">We're reviewing your application</p>
        
        <div className="mb-8">
          {status === 'pending' && (
            <>
              <p className="text-lg text-yellow-600 font-semibold mb-2">
                Your application is pending admin approval
              </p>
              <p className="text-gray-500 text-sm">We'll notify you once a decision is made</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-400 h-2.5 rounded-full animate-pulse" style={{width: '45%'}}></div>
              </div>
            </>
          )}
          {status === 'approved' && (
            <>
              <p className="text-lg text-green-600 font-semibold mb-2">
                Congratulations!
              </p>
              <p className="text-gray-500">Your vendor account has been approved</p>
              <div className="mt-4 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </>
          )}
          {status === 'rejected' && (
            <>
              <p className="text-lg text-red-600 font-semibold mb-2">
                Application Rejected
              </p>
              <p className="text-gray-500 mb-2">We're sorry, your application didn't meet our requirements</p>
              {countdown > 0 && (
                <p className="text-gray-400 text-sm">Redirecting to login in {countdown}s...</p>
              )}
            </>
          )}
        </div>

        <button
          onClick={handleRefresh}
          disabled={checkingStatus || status !== 'pending'}
          className={`w-full flex items-center justify-center gap-2 ${
            status === 'pending' ? 'bg-blue-600 hover:bg-blue-700' : 
            status === 'approved' ? 'bg-green-600 hover:bg-green-700' : 
            'bg-gray-400 cursor-not-allowed'
          } text-white px-6 py-3 rounded-lg transition duration-200 shadow-md ${
            (checkingStatus || status !== 'pending') ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {checkingStatus ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Checking Status...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              {status === 'pending' ? 'Refresh Status' : 
               status === 'approved' ? 'Go to Dashboard' : 'Refresh Disabled'}
            </>
          )}
        </button>

        {status === 'pending' && (
          <p className="text-gray-400 text-xs mt-4">Auto-checking every 15 seconds</p>
        )}
      </div>
    </div>
  );
};

export default ApprovalWaiting;