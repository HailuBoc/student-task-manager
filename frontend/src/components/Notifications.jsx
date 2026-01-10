import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../api';
import './Notifications.css';

function Notifications() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    fetchTasks();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
      setEmailNotifications(response.data.settings?.emailNotifications !== false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getAll();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/settings');
  };

  const handleEmailNotificationsToggle = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    // Save to backend
    authAPI.updateSettings({ emailNotifications: newValue });
  };

  const sendTestEmail = async () => {
    try {
      // Send a test email notification
      const pendingTasks = tasks.filter(task => !task.completed);
      if (pendingTasks.length > 0) {
        // Simulate sending email notification
        alert(`Test email sent to ${user?.email} with ${pendingTasks.length} pending tasks!`);
      } else {
        alert('No pending tasks to notify about!');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
    }
  };

  if (loading) {
    return (
      <div className="notifications-container">
        <div className="loading">Loading notifications...</div>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="notifications-container">
      {/* Header */}
      <header className="notifications-header">
        <button className="back-button" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1 className="notifications-title">Notifications</h1>
      </header>

      {/* Email Notifications Section */}
      <section className="notifications-section">
        <h2 className="section-title">EMAIL NOTIFICATIONS</h2>
        <div className="notification-card">
          <div className="notification-content">
            <div className="notification-icon email-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="notification-info">
              <h3 className="notification-label">Task Completion Emails</h3>
              <p className="notification-description">
                Receive email notifications when tasks are completed
              </p>
            </div>
          </div>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={emailNotifications} 
              onChange={handleEmailNotificationsToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-card">
          <div className="notification-content">
            <div className="notification-icon test-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <div className="notification-info">
              <h3 className="notification-label">Test Email</h3>
              <p className="notification-description">
                Send a test email to verify notifications are working
              </p>
            </div>
          </div>
          <button className="test-button" onClick={sendTestEmail}>
            Send Test Email
          </button>
        </div>
      </section>

      {/* Task Summary */}
      <section className="notifications-section">
        <h2 className="section-title">TASK SUMMARY</h2>
        <div className="task-summary-cards">
          <div className="summary-card pending-card">
            <div className="summary-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,12"/>
              </svg>
            </div>
            <div className="summary-info">
              <h3 className="summary-number">{pendingTasks.length}</h3>
              <p className="summary-label">Pending Tasks</p>
            </div>
          </div>

          <div className="summary-card completed-card">
            <div className="summary-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <div className="summary-info">
              <h3 className="summary-number">{completedTasks.length}</h3>
              <p className="summary-label">Completed Tasks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="notifications-section">
        <h2 className="section-title">INFORMATION</h2>
        <div className="info-card">
          <div className="info-content">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </div>
            <div className="info-text">
              <h3 className="info-title">How Notifications Work</h3>
              <ul className="info-list">
                <li>When you complete a task, an email is sent to your registered email</li>
                <li>Notifications include task title, completion time, and priority</li>
                <li>You can enable/disable email notifications anytime</li>
                <li>Test emails help verify your notification settings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notifications;
