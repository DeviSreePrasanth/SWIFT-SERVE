import CartItem from './CartItem';
import { Link } from 'react-router-dom';

function Cart({ cartItems }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <Link to="/bookings" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Proceed to Book
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;