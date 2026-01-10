import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ onAddTask }) {
  const navigate = useNavigate();

  const handleSettings = () => {
    navigate('/settings');
  };

  const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    if (isDarkMode) {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    } else {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Student Task Manager</h1>
        <div className="header-actions">
          <button className="btn btn-secondary dark-mode-toggle" onClick={toggleDarkMode}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 21 12.79z"/>
            </svg>
            Dark Mode
          </button>
          <button className="btn btn-secondary settings-btn" onClick={handleSettings}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 9.54l4.24 4.24M20.46 14.46l-4.24 4.24M7.76 7.76L3.52 3.52"/>
            </svg>
            Settings
          </button>
          <button className="btn btn-primary" onClick={onAddTask}>
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
