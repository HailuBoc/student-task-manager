import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authAPI } from './api';
import App from './App';
import Login from './components/Login';
import Signup from './components/Signup';
import Settings from './components/Settings';
import Notifications from './components/Notifications';

function AppRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token by checking profile
      authAPI.getProfile()
        .then(() => {
          setIsAuthenticated(true);
          // If there's a redirect path, use it
          if (redirectPath) {
            setRedirectPath(null);
          }
        })
        .catch((error) => {
          console.error('Token verification failed:', error);
          // Clear invalid token
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [redirectPath]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? 
              <Login onLoginSuccess={handleLoginSuccess} /> : 
              <Navigate to={redirectPath || "/dashboard"} replace />
          } 
        />
        <Route 
          path="/signup" 
          element={
            !isAuthenticated ? 
              <Signup onSignupSuccess={handleLoginSuccess} /> : 
              <Navigate to={redirectPath || "/dashboard"} replace />
          } 
        />
        <Route 
          path="/settings" 
          element={
            isAuthenticated ? 
              <Settings /> : 
              <Navigate to="/login" state={{ from: '/settings' }} replace />
          } 
        />
        <Route 
          path="/notifications" 
          element={
            isAuthenticated ? 
              <Notifications /> : 
              <Navigate to="/login" state={{ from: '/notifications' }} replace />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
              <App /> : 
              <Navigate to="/login" state={{ from: '/dashboard' }} replace />
          } 
        />
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
