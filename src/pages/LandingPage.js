import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Simple Navigation */}
      <nav className="public-navbar">
        <div className="container">
          <div className="navbar-content">
            <div className="logo">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">QuickMart</span>
            </div>
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <div className="hero-text">
              <h1>🛒 QuickMart</h1>
              <h2>Fresh Groceries Delivered in Minutes</h2>
              <p>Get fresh groceries and daily essentials delivered to your doorstep in just 10-15 minutes.</p>
              
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>10-15 Min Delivery</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛒</span>
                  <span>70+ Products</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💰</span>
                  <span>Best Prices</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🚚</span>
                  <span>Free Delivery</span>
                </div>
              </div>

              <div className="cta-buttons">
                <Link to="/register" className="cta-primary">Start Shopping</Link>
                <Link to="/login" className="cta-secondary">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="simple-footer">
        <div className="container">
          <p>&copy; 2024 QuickMart - Fresh Groceries Delivered in Minutes</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;