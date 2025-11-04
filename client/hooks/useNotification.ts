import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    if (typeof window !== 'undefined') {
      const savedNotifications = localStorage.getItem('notifications');
      if (savedNotifications) {
        try {
          return JSON.parse(savedNotifications);
        } catch (error) {
          console.error('Failed to parse notifications from localStorage', error);
        }
      }
    }
    return [];
  });

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
      ...notification,
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only last 10 notifications
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  };
}