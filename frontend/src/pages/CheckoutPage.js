import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import mealService from '../services/mealService';
import { validateCheckoutForm } from '../utils/validators';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  });

  const canCheckout = useMemo(() => items.length > 0, [items.length]);

  if (!canCheckout) {
    return (
      <section className="container section-space">
        <p className="status-note">Your cart is empty. Add items before checkout.</p>
      </section>
    );
  }

  const onInputChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (submitError) {
      setSubmitError('');
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    const validationErrors = validateCheckoutForm(formValues);
    setErrors(validationErrors);
    setSubmitError('');

    if (Object.keys(validationErrors).length) {
      return;
    }

    setPlacingOrder(true);

    const payload = {
      customer: formValues,
      items,
      total: totalPrice,
      placedAt: new Date().toISOString(),
    };

    try {
      const result = await mealService.placeOrder(payload);

      clearCart();
      navigate('/order-success', {
        state: {
          orderId: result.orderId,
          customerName: formValues.fullName,
          total: totalPrice,
        },
      });
    } catch (error) {
      setSubmitError(error?.message || 'Unable to place order right now. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <section className="container section-space checkout-section">
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder} noValidate>
          <div className="checkout-form-head">
            <span className="checkout-kicker">Secure Checkout</span>
            <h2>Place Your Order</h2>
            <p>Fill in your delivery details and we will get your meal to your doorstep fast.</p>
          </div>

          <div className="checkout-field-grid">
            <label>
              Full Name
              <input
                value={formValues.fullName}
                onChange={(event) => onInputChange('fullName', event.target.value)}
                placeholder="Your Name"
              />
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </label>

            <label>
              Email
              <input
                type="email"
                value={formValues.email}
                onChange={(event) => onInputChange('email', event.target.value)}
                placeholder="email@email.com"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </label>
          </div>

          <label>
            Address
            <textarea
              value={formValues.address}
              onChange={(event) => onInputChange('address', event.target.value)}
              placeholder="House no, street, area"
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </label>

          <div className="checkout-field-grid">
            <label>
              City
              <input
                value={formValues.city}
                onChange={(event) => onInputChange('city', event.target.value)}
                placeholder="Your city"
              />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </label>

            <label>
              Phone
              <input
                value={formValues.phone}
                onChange={(event) => onInputChange('phone', event.target.value)}
                placeholder="10-digit number"
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </label>
          </div>

          <div className="checkout-actions">
            <button type="submit" className="primary-btn btn-large" disabled={placingOrder}>
              {placingOrder ? 'Placing Order...' : 'Confirm Order'}
            </button>
            <p className="checkout-note">100% secure. No hidden charges.</p>
          </div>

          {submitError && <p className="status-note error">{submitError}</p>}
        </form>

        <aside className="order-summary">
          <h3>Your Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.title} x {item.quantity}</span>
              <strong>₹{item.price * item.quantity}</strong>
            </div>
          ))}
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{totalPrice}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CheckoutPage;
