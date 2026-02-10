import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [registrationStep, setRegistrationStep] = useState(1); // 1: email/phone, 2: OTP, 3: details
  const [formData, setFormData] = useState({
    // Step 1 fields
    email: '',
    phone: '',
    // Step 2 fields
    otp: '',
    // Step 3 fields
    name: '',
    gender: '',
    address: '',
    password: '',
    confirmPassword: '',
    // Login fields
    loginEmail: '',
    loginPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [developmentOTP, setDevelopmentOTP] = useState('');
  const [isProduction, setIsProduction] = useState(process.env.NODE_ENV === 'production');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();



  // Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.email || !formData.phone) {
      setError('Please enter both email and phone number');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://quickmart-backend-1-zfua.onrender.com/api'}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          phone: formData.phone 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP sent successfully! Please check your email.');
        // Only show development OTP in development mode
        if (data.developmentOTP && !isProduction) {
          setDevelopmentOTP(data.developmentOTP);
        }
        setRegistrationStep(2);
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://quickmart-backend-1-zfua.onrender.com/api'}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          phone: formData.phone 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP resent successfully! Please check your email.');
        // Only show development OTP in development mode
        if (data.developmentOTP && !isProduction) {
          setDevelopmentOTP(data.developmentOTP);
        }
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.otp) {
      setError('Please enter the OTP');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://quickmart-backend-1-zfua.onrender.com/api'}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          phone: formData.phone,
          otp: formData.otp
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP verified! Please complete your profile.');
        setRegistrationStep(3);
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete registration
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name || !formData.gender || !formData.address || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://quickmart-backend-1-zfua.onrender.com/api'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          phone: formData.phone,
          otp: formData.otp,
          name: formData.name,
          gender: formData.gender,
          address: formData.address,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Show success modal
        setRegisteredUser(data.user);
        setShowSuccessModal(true);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to complete registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔐 Attempting login with:', { 
      email: formData.loginEmail, 
      password: formData.loginPassword ? '***' : 'empty' 
    });

    const result = await login(formData.loginEmail, formData.loginPassword);
    
    console.log('🔐 Login result:', result);
    
    if (result.success) {
      console.log('✅ Login successful, redirecting...');
      navigate('/');
    } else {
      console.error('❌ Login failed:', result.message);
      setError(result.message);
    }
    
    setLoading(false);
  };

  // Handle success modal close
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  // Reset registration flow
  const resetRegistration = () => {
    setRegistrationStep(1);
    setFormData({
      email: '',
      phone: '',
      otp: '',
      name: '',
      gender: '',
      address: '',
      password: '',
      confirmPassword: '',
      loginEmail: '',
      loginPassword: ''
    });
    setError('');
    setSuccess('');
    setDevelopmentOTP('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🛒 QuickMart</h1>
          <p>Fresh Groceries Delivered in Minutes</p>
        </div>

        <div className="login-tabs">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => {
              setIsLogin(true);
              resetRegistration();
            }}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => {
              setIsLogin(false);
              resetRegistration();
            }}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          // LOGIN FORM
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={formData.loginEmail}
              onChange={(e) => setFormData({...formData, loginEmail: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.loginPassword}
              onChange={(e) => setFormData({...formData, loginPassword: e.target.value})}
              required
            />

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
        ) : (
          // REGISTRATION FORMS
          <>
            {registrationStep === 1 ? (
              // STEP 1: EMAIL & PHONE
              <form onSubmit={handleSendOTP} className="login-form">
                <div className="step-indicator">
                  <h3>Step 1: Enter Details</h3>
                  <p>We'll send you an OTP for verification</p>
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : registrationStep === 2 ? (
              // STEP 2: OTP VERIFICATION
              <form onSubmit={handleVerifyOTP} className="login-form">
                <div className="step-indicator">
                  <h3>Step 2: Verify OTP</h3>
                  <p>Enter the OTP sent to {formData.email}</p>
                  {developmentOTP && !isProduction && (
                    <p style={{color: '#28a745', fontSize: '14px'}}>
                      Development OTP: {developmentOTP}
                    </p>
                  )}
                  <button 
                    type="button" 
                    className="back-btn"
                    onClick={() => setRegistrationStep(1)}
                  >
                    ← Back to Step 1
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                  maxLength="6"
                  required
                />

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button 
                  type="button" 
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="resend-btn"
                  style={{
                    marginTop: '10px',
                    background: 'transparent',
                    color: '#2c5aa0',
                    border: '1px solid #2c5aa0',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {loading ? 'Resending...' : 'Resend OTP'}
                </button>
              </form>
            ) : (
              // STEP 3: COMPLETE PROFILE
              <form onSubmit={handleCompleteRegistration} className="login-form">
                <div className="step-indicator">
                  <h3>Step 3: Complete Profile</h3>
                  <p>Almost done! Fill in your details</p>
                  <button 
                    type="button" 
                    className="back-btn"
                    onClick={() => setRegistrationStep(2)}
                  >
                    ← Back to OTP
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />

                {error && <div className="error-message">{error}</div>}

                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </button>
              </form>
            )}
          </>
        )}


      </div>
      
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Registration Successful!"
        message={`Welcome to QuickMart, ${registeredUser?.name}! Your account has been created successfully.`}
        user={registeredUser}
      />
    </div>
  );
}

export default Login;
