// users/cart/Cart.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../user-components/CartItem';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Cleaning', price: 50, quantity: 1 },
    { id: 2, title: 'Plumbing', price: 75, quantity: 1 },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Navigate to Checkout with cart data (could also pass via state)
    navigate('/checkout', { state: { cartItems, totalPrice } });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-lg font-semibold">Total: ${totalPrice}</h3>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;