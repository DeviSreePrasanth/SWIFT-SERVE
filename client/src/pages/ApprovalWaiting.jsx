import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApprovalWaiting = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[400px]">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Awaiting Approval</h2>
        <p className="text-gray-600 mb-6">
          Your vendor profile is under review. You will be notified once approved by the admin.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ApprovalWaiting;