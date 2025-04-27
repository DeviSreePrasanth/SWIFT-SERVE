import React from 'react';
function CartItem({ item }) {
    return (
      <div className="border-b py-2">
        <h4 className="text-lg">{item.service.name}</h4>
        <p>Category: {item.service.category}</p>
        <p>Price: ₹{item.service.price}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Estimated Time: {item.service.timeEstimated} hours</p>
      </div>
    );
  }
  
  export default CartItem;