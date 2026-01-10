import React, { useState, useEffect } from 'react';

function NotificationManager({ tasks }) {
  const [notifications, setNotifications] = useState([]);
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    // Request notification permission on component mount
    if ('Notification' in window) {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
      });
    }
  }, []);

  useEffect(() => {
    // Check for overdue tasks
    const checkOverdueTasks = () => {
      const overdueTasks = tasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return dueDate < today && !task.completed;
      });

      // Show notification for each overdue task (limit to avoid spam)
      overdueTasks.slice(0, 3).forEach(task => {
        showNotification(task);
      });
    };

    // Check immediately and then every 5 minutes
    checkOverdueTasks();
    const interval = setInterval(checkOverdueTasks, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [tasks]);

  const showNotification = (task) => {
    // Browser notification
    if (permission === 'granted' && !document.hidden) {
      new Notification('Overdue Task', {
        body: `"${task.title}" is overdue! Due: ${new Date(task.dueDate).toLocaleDateString()}`,
        icon: '/favicon.ico',
        tag: `overdue-${task._id}`, // Prevent duplicate notifications
      });
    }

    // In-app notification
    setNotifications(prev => {
      const exists = prev.find(n => n.taskId === task._id);
      if (!exists) {
        const newNotification = {
          id: Date.now(),
          taskId: task._id,
          title: task.title,
          message: `Task "${task.title}" is overdue!`,
          type: 'overdue',
          timestamp: new Date()
        };
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
          setNotifications(current => current.filter(n => n.id !== newNotification.id));
        }, 10000);

        return [...prev, newNotification];
      }
      return prev;
    });
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            <div className="notification-header">
              <span className="notification-title">
                {notification.type === 'overdue' && '⚠️ Overdue Task'}
              </span>
              <button
                className="notification-close"
                onClick={() => removeNotification(notification.id)}
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
            <p className="notification-message">{notification.message}</p>
            <span className="notification-time">
              {notification.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationManager;
