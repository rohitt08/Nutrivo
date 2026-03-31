import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLeaf,
  faBolt,
  faCircleCheck,
  faSeedling,
  faClock,
  faBoxOpen,
  faHeartPulse,
  faEnvelope,
  faPhone,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-shell footer-top">
        <div className="footer-brand">
          <h4>Nutrivo</h4>
          <p>Balanced meals, premium experience, and healthier daily routines delivered fast.</p>
          <div className="footer-icon-row">
            <span className="footer-icon-pill" title="Fresh Picks">
              <FontAwesomeIcon icon={faLeaf} /> Fresh
            </span>
            <span className="footer-icon-pill" title="Fast Delivery">
              <FontAwesomeIcon icon={faBolt} /> Quick
            </span>
            <span className="footer-icon-pill" title="Trusted Quality">
              <FontAwesomeIcon icon={faCircleCheck} /> Trusted
            </span>
          </div>
          <div className="footer-socials" aria-label="Social links">
            <a href="#" className="footer-social" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="footer-social" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="footer-social" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
        <div className="footer-card">
          <h4>Explore</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
        <div className="footer-card">
          <h4>Nutrivo Promise</h4>
          <p><FontAwesomeIcon icon={faSeedling} /> Ingredient transparency</p>
          <p><FontAwesomeIcon icon={faClock} /> Freshly prepared daily</p>
          <p><FontAwesomeIcon icon={faBoxOpen} /> Hygienic eco packaging</p>
          <p><FontAwesomeIcon icon={faHeartPulse} /> Nutrition-first approach</p>
        </div>
        <div className="footer-card">
          <h4>Support</h4>
          <p><FontAwesomeIcon icon={faEnvelope} /> care@nutrivo.com</p>
          <p><FontAwesomeIcon icon={faPhone} /> +91 90000 12345</p>
          <p><FontAwesomeIcon icon={faCalendarDays} /> Mon - Sat | 8 AM - 10 PM</p>
          <div className="footer-mini-subscribe">
            <p>Get weekly healthy meal updates</p>
            <button type="button" className="footer-subscribe-btn">Notify Me</button>
          </div>
        </div>
      </div>

      <div className="footer-shell footer-bottom">
        <p className="footer-copy">Copyright 2026 Nutrivo. All rights reserved.</p>
        <div className="footer-meta-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Refund</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
