// components/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemInCart, removeItemFromCart, clearCart } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.id); // Assuming you have a user slice in your Redux store

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateItemInCart({ userId, productId, quantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItemFromCart({ userId, productId }));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item) => (
        <div key={item.product._id}>
          <h2>{item.product.title}</h2>
          <p>Price: {item.product.price}</p>
          <p>Quantity: 
            <input 
              type="number" 
              value={item.quantity} 
              onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value, 10))} 
              min="1"
            />
          </p>
          <button onClick={() => handleRemoveItem(item.product._id)}>Remove</button>
        </div>
      ))}
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
