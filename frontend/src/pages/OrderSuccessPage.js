import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderSuccessPage = () => {
  const { state } = useLocation();

  return (
    <section className="container section-space">
      <div className="success-card order-success-card page-empty">
        <p className="success-icon" aria-hidden="true">✅</p>
        <h2>Order Confirmed</h2>
        <p>Thank you for choosing Nutrivo. Your meal is being prepared.</p>
        <p>Order ID: <strong>{state?.orderId || 'HN-000000'}</strong></p>
        <p>Name: {state?.customerName || 'Guest User'}</p>
        <p>Total Paid: ₹{state?.total || 0}</p>
        <div className="hero-actions">
          <Link to="/menu" className="primary-btn nav-btn-link">Order Again</Link>
          <Link to="/" className="secondary-btn nav-btn-link">Back Home</Link>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccessPage;
