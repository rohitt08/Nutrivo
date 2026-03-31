import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import logo from '../../logo/logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const profileDropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" to="/">
          <img className="brand-logo" src={logo} alt="Nutrivo logo" />
          <div>
            <p className="brand-name">Nutrivo</p>
            <p className="brand-tagline">Healthy meal ordering</p>
          </div>
        </Link>

        <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)}>
          Menu
        </button>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink
            to="/menu"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Meals
          </NavLink>
          <NavLink
            to="/checkout"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Order
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setOpen(false)}
            className={({ isActive }) => `cart-link ${isActive ? 'active' : ''}`.trim()}
          >
            Cart
            <span className="cart-count">{totalItems}</span>
          </NavLink>

          {isAuthenticated ? (
            <div className="profile-zone" ref={profileDropdownRef}>
              <button
                type="button"
                className="profile-button"
                onClick={() => setProfileOpen((val) => !val)}
                aria-label="Profile menu"
                aria-expanded={profileOpen}
              >
                <span className="profile-icon">👤</span>
                <span className="profile-name">{user?.name || user?.userName || 'User'}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {profileOpen && (
                <div className="profile-dropdown">
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => {
                      setProfileOpen(false);
                      setOpen(false);
                    }}
                  >
                    ✏️ Edit Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="dropdown-item"
                    onClick={() => {
                      setProfileOpen(false);
                      setOpen(false);
                    }}
                  >
                    📦 Previous Orders
                  </Link>
                  <button
                    type="button"
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Login
              </NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)} className="primary-btn nav-btn-link">
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
