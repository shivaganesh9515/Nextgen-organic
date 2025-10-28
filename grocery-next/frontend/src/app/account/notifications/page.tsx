'use client';

import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Bell, Package, Tag } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/common/EmptyState';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'offer' | 'system';
  date: Date;
  read: boolean;
  link?: string;
}

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Delivered',
      message: 'Your order #12345 has been delivered successfully.',
      type: 'order',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      link: '/account/orders/12345',
    },
    {
      id: '2',
      title: 'Special Offer',
      message: 'Get 20% off on your next order. Use code: SAVE20',
      type: 'offer',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      link: '/shop',
    },
    {
      id: '3',
      title: 'Order Confirmation',
      message: 'Your order #12346 has been confirmed and is being processed.',
      type: 'order',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: false,
      link: '/account/orders/12346',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    // In a real app, this would make an API call
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    // In a real app, this would make an API call
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    // In a real app, this would make an API call
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="h-5 w-5" />;
      case 'offer':
        return <Tag className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return null; // Handled by layout
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Notifications {unreadCount > 0 && (
            <span className="ml-2 badge badge-primary">
              {unreadCount} unread
            </span>
          )}
        </h2>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>
      
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`card p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <div className="flex">
                <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${getTypeColor(notification.type)}`}>
                  {getTypeIcon(notification.type)}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <span>
                      {notification.date.toLocaleDateString()} at {notification.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {notification.link && (
                      <a href={notification.link} className="ml-4 text-primary-600 hover:text-primary-700">
                        View details
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No notifications"
          description="You don't have any notifications at the moment"
          icon={<Bell className="h-12 w-12 text-gray-400" />}
        />
      )}
    </div>
  );
}