import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = {
    id: localStorage.getItem('userId'),
    name: localStorage.getItem('userName'),
  };

  // Fetch cart items
  const fetchCart = async () => {
    if (!user.id) {
      setCartItems([]);
      setLoading(false);
      toast.info('Please log in to view your cart.', { autoClose: 3000 });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
      setCartItems(response.data[0]?.items || []);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError('Failed to fetch cart items: ' + errorMessage);
      toast.error('Failed to load cart. Please try again.', { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (item, suppressToast = false) => {
    if (!user.id) {
      if (!suppressToast) {
        toast.error('Please log in to add items to your cart.', { autoClose: 3000 });
      }
      throw new Error('User not logged in');
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/cart/add`, {
        userId: user.id,
        ...item,
      });
      setCartItems(response.data.cart.items || []);
      setError(null);
      if (!suppressToast) {
        toast.success(`${item.serviceName} added to cart!`, {
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
      return response.data; // Return response for confirmation
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError('Failed to add item to cart: ' + errorMessage);
      if (!suppressToast) {
        if (errorMessage === 'Service already added to cart') {
          toast.error(`${item.serviceName} is already in your cart.`, { autoClose: 3000 });
        } else {
          toast.error('Failed to add item to cart. Please try again.', { autoClose: 3000 });
        }
      }
      throw err; // Re-throw to allow caller to handle
    }
  };

  // Remove item from cart
  const removeFromCart = async (vendorId, serviceName) => {
    if (!user.id) {
      toast.error('Please log in to manage your cart.', { autoClose: 3000 });
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${user.id}`, {
        data: { vendorId, serviceName },
      });
      setCartItems(response.data.cart || []);
      setError(null);
      toast.success(`${serviceName} removed from cart!`, { autoClose: 3000 });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError('Failed to remove item from cart: ' + errorMessage);
      toast.error('Failed to remove item from cart. Please try again.', { autoClose: 3000 });
    }
  };

  // Clear cart (e.g., after checkout)
  const clearCart = async () => {
    if (!user.id) {
      toast.error('Please log in to manage your cart.', { autoClose: 3000 });
      return;
    }
    try {
      setCartItems([]); // Optimistic update
      await axios.delete(`http://localhost:5000/api/cart/clear/${user.id}`);
      setError(null);
      toast.success('Cart cleared successfully!', { autoClose: 3000 });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError('Failed to clear cart: ' + errorMessage);
      toast.error('Failed to clear cart. Please try again.', { autoClose: 3000 });
      // Optionally refetch cart to restore state
      await fetchCart();
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user.id]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLength: cartItems.length,
        loading,
        error,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};