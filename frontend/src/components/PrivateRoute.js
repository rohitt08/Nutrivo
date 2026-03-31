import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, authReady } = useAuth();

  // Still checking auth status
  if (!authReady) {
    return (
      <div className="container section-space">
        <div className="auth-card">
          <h2>Verifying access...</h2>
          <p>Please wait a moment.</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated - show the route
  return children;
};

export default PrivateRoute;
