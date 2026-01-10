import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserSettings();
    // Apply dark mode on component mount
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-mode');
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(savedDarkMode);
    } catch (error) {
      console.error('Error fetching user settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const handleNotifications = () => {
    // Navigate to notifications page or show notification settings
    navigate('/notifications');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Force logout even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="settings-container">
        <div className="loading">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      {/* Header */}
      <header className="settings-header">
        <button className="back-button" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1 className="settings-title">Settings</h1>
      </header>

      {/* Profile Section */}
      <section className="settings-section">
        <h2 className="section-title">PROFILE</h2>
        <div className="profile-card">
          <div className="profile-picture-container">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=4f46e5&color=fff&size=128`}
              alt="Profile"
              className="profile-picture"
            />
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{user?.name || 'Loading...'}</h3>
            <p className="profile-email">{user?.email || 'Loading...'}</p>
          </div>
        </div>
      </section>

      {/* Appearance Section */}
      <section className="settings-section">
        <h2 className="section-title">APPEARANCE</h2>
        <div className="setting-card">
          <div className="setting-content">
            <div className="setting-icon dark-mode-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </div>
            <span className="setting-label">Dark Mode</span>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={handleDarkModeToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </section>

      {/* Notifications Section */}
      <section className="settings-section">
        <h2 className="section-title">NOTIFICATIONS</h2>
        <div className="setting-card" onClick={handleNotifications}>
          <div className="setting-content">
            <div className="setting-icon notifications-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 2c-3.314 0-6 2.686-6 6v2c0 2.962 1.637 5.543 4 6.819V22a1 1 0 0 0 1.532.948c.4-.244.836-.48 1.312-.748A9.98 9.98 0 0 0 12 22a9.98 9.98 0 0 0 8.156-4.8c.476.268.912.504 1.312.748A1 1 0 0 0 22.532 22v-5.181c2.363-1.276 4-3.857 4-6.819V8z"/>
              </svg>
            </div>
            <span className="setting-label">Notifications</span>
          </div>
          <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </section>

      {/* Account Section */}
      <section className="settings-section">
        <h2 className="section-title">ACCOUNT</h2>
        
        <div className="setting-card account-card" onClick={handleChangePassword}>
          <div className="setting-content">
            <div className="setting-icon change-password-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span className="setting-label">Change Password</span>
          </div>
          <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>

        <div className="setting-card account-card logout-card" onClick={handleLogout}>
          <div className="setting-content">
            <div className="setting-icon logout-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
              </svg>
            </div>
            <span className="setting-label">Log Out</span>
          </div>
          <svg className="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="settings-footer">
        <p className="app-version">StudentTasks v2.4.0</p>
        <p className="app-motto">Made with care for better grades</p>
      </footer>
    </div>
  );
}

export default Settings;
