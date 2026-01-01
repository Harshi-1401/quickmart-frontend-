import React from 'react';
import './SuccessModal.css';

function SuccessModal({ isOpen, onClose, title, message, user }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="success-icon">🎉</div>
          <h2>{title}</h2>
        </div>
        
        <div className="modal-body">
          <p className="welcome-message">{message}</p>
          
          {user && (
            <div className="user-details">
              <div className="detail-item">
                <span className="detail-label">📧 Email:</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📱 Phone:</span>
                <span className="detail-value">{user.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">👤 Name:</span>
                <span className="detail-value">{user.name}</span>
              </div>
            </div>
          )}
          
          <p className="redirect-message">
            You will be redirected to the homepage shortly.
          </p>
        </div>
        
        <div className="modal-footer">
          <button className="continue-btn" onClick={onClose}>
            Continue to QuickMart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;