import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartList from '../components/CartList';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`);
      console.log('API Response:', response.data);
      setCartItems(response.data[0]?.items || []);
      setError(null);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Failed to fetch cart items: ' + err.message);
    }
    setLoading(false);
  };

  const handleRemoveFromCart = async (vendorId, serviceName) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/cart/remove/${userId}`, {
        data: { vendorId, serviceName },
      });
      console.log('Remove Response:', response.data);
      setCartItems(response.data.cart || []);
      setError(null);
    } catch (err) {
      console.error('Remove Error:', err);
      setError('Failed to remove item from cart: ' + err.message);
    }
    setLoading(false);
  };

  const handleProceedToBookings = () => {
    navigate('/booking-confirmation');
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      setError('No user ID provided');
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>
      <CartList
        cartItems={cartItems}
        loading={loading}
        error={error}
        onRemoveFromCart={handleRemoveFromCart}
      />
      <div className="mt-6 p-4 bg-white shadow-md rounded-lg sticky bottom-0">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Amount: ${totalAmount.toFixed(2)}
          </h2>
          <button
            onClick={handleProceedToBookings}
            disabled={cartItems.length === 0 || loading}
            className={`px-6 py-2 rounded-md text-white transition ${
              cartItems.length === 0 || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Proceed to Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;