'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle, Package, Truck, Star, X } from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'order' | 'delivery' | 'review' | 'promotion';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #12345 has been confirmed and will be delivered soon!',
      time: '2 mins ago',
      read: false,
      link: '/account/orders',
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Out for Delivery',
      message: 'Your order #12340 is out for delivery. Expected arrival: Today, 3:00 PM',
      time: '1 hour ago',
      read: false,
      link: '/account/orders',
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on all Hyderabadi Biryani kits this week!',
      time: '3 hours ago',
      read: true,
      link: '/meal-kits',
    },
    {
      id: '4',
      type: 'review',
      title: 'Rate Your Purchase',
      message: 'How was your recent purchase? Share your feedback and earn reward points!',
      time: '1 day ago',
      read: true,
      link: '/account/orders',
    },
  ]);

  const notificationRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <CheckCircle className="w-5 h-5 text-[#4a7c59]" />;
      case 'delivery':
        return <Truck className="w-5 h-5 text-[#8b6f47]" />;
      case 'review':
        return <Star className="w-5 h-5 text-[#fbbf24]" />;
      case 'promotion':
        return <Package className="w-5 h-5 text-[#c17767]" />;
      default:
        return <Bell className="w-5 h-5 text-[#5a5a5a]" />;
    }
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl hover:bg-[#f5f1e8] transition-colors text-[#5a5a5a] hover:text-[#2d5016]"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#c17767] to-[#d48777] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#d4c4a8]/30 overflow-hidden z-50 max-h-[500px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#d4c4a8]/30 bg-gradient-to-br from-[#e8f5e9] to-white">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#2d5016]">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs text-[#5a5a5a] bg-[#f5f1e8] px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto max-h-[400px]">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-[#d4c4a8] mx-auto mb-3" />
                <p className="text-[#8b8b8b] text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[#d4c4a8]/30">
                {notifications.map((notification) => {
                  const content = (
                    <div
                      className={`p-4 hover:bg-[#f5f1e8] transition-colors cursor-pointer ${
                        !notification.read ? 'bg-[#e8f5e9]/30' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-[#2d5016]">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-[#4a7c59] rounded-full flex-shrink-0 mt-1.5"></span>
                            )}
                          </div>
                          <p className="text-xs text-[#5a5a5a] mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[#8b8b8b] mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  );

                  return notification.link ? (
                    <Link
                      key={notification.id}
                      href={notification.link}
                      onClick={() => setIsOpen(false)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={notification.id}>{content}</div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-[#d4c4a8]/30 bg-[#faf9f6]">
            <Link
              href="/account/notifications"
              className="block text-center text-sm font-medium text-[#4a7c59] hover:text-[#2d5016] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}