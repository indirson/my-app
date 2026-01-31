import React from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../store/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleContinueShopping = () => navigate('/');
  const handleCheckout = () => navigate('/checkout');

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <p className="empty-cart">Your cart is empty</p>
        <button onClick={handleContinueShopping} className="btn-continue">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-summary">
        <div className="summary-item">
          <h3>Total Items</h3>
          <p className="summary-value">{totalItems}</p>
        </div>
        <div className="summary-item">
          <h3>Total Cost</h3>
          <p className="summary-value">${totalCost.toFixed(2)}</p>
        </div>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.thumbnail || `https://via.placeholder.com/100?text=${item.name}`} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="unit-price">Unit Price: ${item.price.toFixed(2)}</p>
              <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="item-controls">
              <button onClick={() => dispatch(decreaseQuantity(item.id))} className="btn-decrease">−</button>
              <span className="quantity">{item.quantity}</span>
              <button onClick={() => dispatch(increaseQuantity(item.id))} className="btn-increase">+</button>
            </div>
            <button onClick={() => dispatch(removeItem(item.id))} className="btn-delete">Delete</button>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button onClick={handleContinueShopping} className="btn-continue">Continue Shopping</button>
        <button onClick={handleCheckout} className="btn-checkout">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
