// users/cart/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!cartItems.length) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing (replace with API call to payment gateway)
    setTimeout(() => {
      console.log('Payment processed:', { cartItems, totalPrice, paymentDetails });
      setIsProcessing(false);
      navigate('/booking-history', { state: { message: 'Checkout successful!' } });
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">No items in cart.</p>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.title} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  value={paymentDetails.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Checkout;