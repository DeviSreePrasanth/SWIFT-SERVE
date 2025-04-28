import React, { useState, useEffect, useMemo } from 'react';
import { FaCheckCircle, FaClock, FaDollarSign, FaList } from 'react-icons/fa';

const VendorHome = () => {
  const [metrics, setMetrics] = useState({
    ordersCompleted: 0,
    ordersPending: 0,
    paymentsPending: 0,
    totalOrders: 0,
  });
  const [orders, setOrders] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('totalOrders'); // Default to showing all orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');

        const [metricsRes, ordersRes] = await Promise.all([
          fetch('http://localhost:5000/api/analytics', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/vendor/bookings', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!metricsRes.ok) throw new Error('Failed to fetch analytics');
        if (!ordersRes.ok) throw new Error('Failed to fetch bookings');

        const metricsData = await metricsRes.json();
        const ordersData = await ordersRes.json();

        setMetrics(metricsData);
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = useMemo(() => {
    if (!selectedMetric) return orders; // Fallback to all orders if no metric selected
    return orders.filter((order) => {
      switch (selectedMetric) {
        case 'ordersPending':
          return order.status === 'pending' || order.status === 'confirmed';
        case 'ordersCompleted':
          return order.status === 'completed';
        case 'paymentsPending':
          // Assuming orders have a paymentStatus field; adjust based on API
          return order.paymentStatus === 'pending';
        case 'totalOrders':
        default:
          return true;
      }
    });
  }, [orders, selectedMetric]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Error: {error}
        <button
          onClick={() => setError(null)}
          className="ml-4 text-blue-500 underline"
        >
          Clear Error
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            key: 'ordersCompleted',
            title: 'Orders Completed',
            icon: <FaCheckCircle className="text-green-500 text-3xl" />,
            value: metrics.ordersCompleted,
          },
          {
            key: 'ordersPending',
            title: 'Orders Pending',
            icon: <FaClock className="text-yellow-500 text-3xl" />,
            value: metrics.ordersPending,
          },
          {
            key: 'paymentsPending',
            title: 'Payments Pending',
            icon: <FaDollarSign className="text-red-500 text-3xl" />,
            value: `$${metrics.paymentsPending.toFixed(2)}`,
          },
          {
            key: 'totalOrders',
            title: 'Total Orders',
            icon: <FaList className="text-blue-500 text-3xl" />,
            value: metrics.totalOrders,
          },
        ].map((metric) => (
          <div
            key={metric.key}
            className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer ${
              selectedMetric === metric.key ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric(metric.key)}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedMetric(metric.key)}
            tabIndex={0}
            role="button"
            aria-label={`View ${metric.title}`}
          >
            <div className="flex items-center space-x-4">
              {metric.icon}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{metric.title}</h2>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {selectedMetric === 'ordersCompleted'
            ? 'Completed Orders'
            : selectedMetric === 'ordersPending'
            ? 'Pending Orders'
            : selectedMetric === 'paymentsPending'
            ? 'Orders with Pending Payments'
            : 'All Orders'}
        </h2>
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Order #{order._id}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Customer:</span>{' '}
                  {order.userId?.name || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Contact:</span>{' '}
                  {order.userId?.vendorProfile?.mobileNumber || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Address:</span>{' '}
                  {order.userId?.vendorProfile?.address || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Date:</span>{' '}
                  {order.timeSlot ? order.timeSlot.split(' ')[0] : 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'pending' || order.status === 'confirmed'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status
                      ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                      : 'N/A'}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Amount:</span>{' '}
                  $
                  {order.services
                    ? order.services
                        .reduce((sum, s) => sum + s.quantity * s.service.price, 0)
                        .toFixed(2)
                    : '0.00'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No orders found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default VendorHome;