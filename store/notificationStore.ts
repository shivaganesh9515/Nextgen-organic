import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (notification) => {
        const newNotification: Notification = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          read: false,
          ...notification,
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications.slice(0, 9)], // Keep only last 10 notifications
        }));
      },
      markAsRead: (id) => 
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          ),
        })),
      markAllAsRead: () => 
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
        })),
      removeNotification: (id) => 
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        })),
      clearAll: () => set({ notifications: [] }),
      getUnreadCount: () => 
        get().notifications.filter((notification) => !notification.read).length,
    }),
    {
      name: 'notification-storage',
    }
  )
);