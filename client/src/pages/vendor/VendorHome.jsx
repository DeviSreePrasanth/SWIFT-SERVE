import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaClock, FaDollarSign, FaList } from 'react-icons/fa';

const VendorHome = () => {
  const [metrics, setMetrics] = useState({
    ordersCompleted: 0,
    ordersPending: 0,
    paymentsPending: 0,
    totalOrders: 0,
  });

  // Mock fetching metrics (replace with backend API)
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Mock data
        const response = await new Promise(resolve =>
          setTimeout(
            () =>
              resolve({
                data: {
                  ordersCompleted: 120,
                  ordersPending: 15,
                  paymentsPending: 450.75,
                  totalOrders: 135,
                },
              }),
            1000
          )
        );
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    fetchMetrics();
    // Uncomment for real backend
    // fetch('http://localhost:3000/api/vendor/metrics')
    //   .then(res => res.json())
    //   .then(data => setMetrics(data))
    //   .catch(err => console.error('Error fetching metrics:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Orders Completed */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center space-x-4">
          <FaCheckCircle className="text-green-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Orders Completed</h2>
            <p className="text-2xl font-bold text-gray-900">{metrics.ordersCompleted}</p>
          </div>
        </div>
      </div>

      {/* Orders Pending */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center space-x-4">
          <FaClock className="text-yellow-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Orders Pending</h2>
            <p className="text-2xl font-bold text-gray-900">{metrics.ordersPending}</p>
          </div>
        </div>
      </div>

      {/* Payments Pending */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center space-x-4">
          <FaDollarSign className="text-red-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Payments Pending</h2>
            <p className="text-2xl font-bold text-gray-900">${metrics.paymentsPending.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Total Orders */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex items-center space-x-4">
          <FaList className="text-blue-500 text-3xl" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
            <p className="text-2xl font-bold text-gray-900">{metrics.totalOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHome;