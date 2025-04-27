
import React, { createContext, useState, useContext } from 'react';

import { addToCart } from '../user-services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = async (serviceId) => {
    try {
      await addToCart({ userId: 'tempUser123', serviceId, quantity: 1 });
      setCartCount(prev => prev + 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}