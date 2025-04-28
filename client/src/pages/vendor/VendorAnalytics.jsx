import React, { useState, useEffect } from 'react';

const VendorAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    averageRating: 4.5,
    totalOrders: 135,
    monthlyOrders: [10, 15, 20, 25, 30, 35],
  });

  useEffect(() => {
    // Mock fetch analytics
    // fetch('http://localhost:3000/api/vendor/analytics')
    //   .then(res => res.json())
    //   .then(data => setAnalytics(data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Average Rating</h2>
          <p className="text-2xl font-bold text-gray-900">{analytics.averageRating.toFixed(1)} / 5</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
          <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm col-span-2">
          <h2 className="text-lg font-semibold text-gray-800">Monthly Orders (Last 6 Months)</h2>
          <div className="flex space-x-4 mt-4">
            {analytics.monthlyOrders.map((count, index) => (
              <div key={index} className="flex-1">
                <div
                  className="bg-blue-500 rounded"
                  style={`{ height: ${count * 5}px }`}
                ></div>
                <p className="text-sm text-gray-600 text-center">Month {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;