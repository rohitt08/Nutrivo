import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="container section-space">
      <div className="empty-card page-empty not-found-state">
        <p className="success-icon" aria-hidden="true">🧭</p>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="primary-btn nav-btn-link">Go to Homepage</Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
