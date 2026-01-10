import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../api';
import '../App.css';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Get the redirect path from location state
  const from = location.state?.from || '/dashboard';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!password) {
      setError('Password is required');
      return false;
    }

    if (password.length < 1) {
      setError('Password cannot be empty');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login({
        email: formData.email.trim(),
        password: formData.password
      });
      
      // Store authentication data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Show success state briefly before redirect
      setSuccess(true);
      
      // Call parent callback
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Redirect to the intended page after a short delay
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      if (error.response?.status === 401) {
        setError('Invalid email or password');
      } else if (error.response?.status === 404) {
        setError('User not found. Please check your email or sign up');
      } else if (error.response?.status === 400) {
        setError(error.response?.data?.error || 'Invalid login credentials');
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please check your internet connection');
      } else {
        setError('Login failed. Please try again later');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="success-message">
            <div className="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <h2 className="success-title">Login Successful!</h2>
            <p className="success-text">Welcome back! Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Student Tasks</h1>
        <p className="login-subtitle">Sign in to manage your tasks</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              disabled={loading}
              className={error && !formData.email ? 'error' : ''}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              disabled={loading}
              className={error && !formData.password ? 'error' : ''}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <span className="button-loading">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
          <p className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
