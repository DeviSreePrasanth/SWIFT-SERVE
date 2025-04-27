import React from 'react';
import { useEffect, useState } from 'react';
import { getCart } from '../user-services/api';
import Cart from '../user-components/Cart';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart('tempUser123');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  return (
    <div>
      <Cart cartItems={cartItems} />
    </div>
  );
}

export default CartPage;