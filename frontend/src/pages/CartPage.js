import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuantitySelector from '../components/common/QuantitySelector';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <section className="container section-space">
        <div className="empty-card page-empty cart-empty-state">
          <h2>Your cart is empty</h2>
          <p>Add healthy meals to continue.</p>
          <Link to="/menu" className="primary-btn nav-btn-link">
            Browse Meals
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container section-space">
      <div className="section-title-wrap">
        <h2>Cart Summary</h2>
        <p>{totalItems} items selected</p>
      </div>

      <div className="cart-list">
        {items.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />

            <div>
              <h3>{item.title}</h3>
              <p>{item.category}</p>
              <p className="cart-item-price">₹{item.price}</p>
            </div>

            <QuantitySelector
              value={item.quantity}
              onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            />

            <div className="cart-item-end">
              <p>₹{item.quantity * item.price}</p>
              <button type="button" className="danger-link" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="checkout-panel">
        <h3>Total: ₹{totalPrice}</h3>
        <p>Delivery is free on all healthy meal orders.</p>
        <button type="button" className="primary-btn" onClick={() => navigate('/checkout')}>
          Continue to Checkout
        </button>
      </div>
    </section>
  );
};

export default CartPage;
