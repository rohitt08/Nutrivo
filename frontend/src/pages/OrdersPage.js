import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const navigate = useNavigate();

  return (
    <section className="container section-space orders-section">
      <div className="orders-empty-shell">
        <div className="orders-empty-visual orders-stagger" style={{ '--order-delay': '40ms' }} aria-hidden="true">
          <div className="orders-illustration-wrap">
            <svg className="orders-illustration" viewBox="0 0 260 210" role="img" aria-label="Empty orders illustration">
              <defs>
                <linearGradient id="boxFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e9f8ea" />
                  <stop offset="100%" stopColor="#d7eed9" />
                </linearGradient>
              </defs>
              <rect x="34" y="58" width="192" height="116" rx="18" fill="url(#boxFill)" stroke="#9ed4a2" strokeWidth="2" />
              <path d="M34 94h192" stroke="#9ed4a2" strokeWidth="2" />
              <path d="M130 58v116" stroke="#9ed4a2" strokeWidth="2" />
              <rect x="107" y="112" width="46" height="14" rx="7" fill="#8bcf90" />
              <circle cx="74" cy="46" r="8" fill="#cbe9ce" />
              <circle cx="96" cy="32" r="5" fill="#d9f1db" />
              <circle cx="186" cy="34" r="7" fill="#d3eed6" />
              <circle cx="205" cy="48" r="4" fill="#dff3e1" />
            </svg>
          </div>
          <span className="empty-icon">📦</span>
          <p>Your meal history appears here</p>
        </div>

        <div className="empty-card orders-empty orders-stagger" style={{ '--order-delay': '140ms' }}>
          <h2>Your Order History</h2>
          <p className="empty-subtitle orders-stagger" style={{ '--order-delay': '220ms' }}>No orders yet</p>
          <p className="empty-description">
            Start your first order to track deliveries, reorder favorites, and manage your meal journey from one place.
          </p>

          <ul className="orders-benefits orders-stagger" style={{ '--order-delay': '280ms' }}>
            <li>Real-time order status updates</li>
            <li>Quick reorder for favorite meals</li>
            <li>Easy access to past invoices</li>
          </ul>

          <div className="empty-actions orders-stagger" style={{ '--order-delay': '340ms' }}>
            <button type="button" className="primary-btn btn-large" onClick={() => navigate('/menu')}>
              Explore Menu
            </button>
            <button type="button" className="secondary-btn btn-large" onClick={() => navigate('/')}>
              Back To Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
