"use client";

import { useState, useEffect } from "react";
import { Bell, Check, CheckCheck, Filter, Loader2, User, ShoppingCart, Package } from "lucide-react";
import { adminApi } from "@/lib/api";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  extra_data?: any;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await adminApi.getNotifications();
      setNotifications(data as unknown as Notification[]);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await adminApi.markRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllRead = async () => {
    try {
      await adminApi.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "NEW_VENDOR": return <User className="text-blue-400" size={24} />;
      case "NEW_ORDER": return <ShoppingCart className="text-[#BEF264]" size={24} />;
      case "NEW_PRODUCT": return <Package className="text-purple-400" size={24} />;
      case "VENDOR_UPDATE": return "📝";
      case "SYSTEM": return "⚠️";
      default: return <Bell className="text-gray-400" size={24} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "NEW_VENDOR": return "New Vendor";
      case "NEW_ORDER": return "New Order";
      case "NEW_PRODUCT": return "New Product";
      case "VENDOR_UPDATE": return "Vendor Update";
      case "SYSTEM": return "System";
      default: return type;
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.is_read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-[#BEF264]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#BEF264]/10 rounded-xl flex items-center justify-center">
            <Bell className="text-[#BEF264]" size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <p className="text-sm text-[#71717A]">
              {unreadCount > 0 ? `${unreadCount} unread messages` : "All caught up!"}
            </p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-[#27272A] hover:bg-[#3f3f46] text-white rounded-lg text-sm transition-colors"
          >
            <CheckCheck size={16} />
            Mark All Read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 text-[#71717A] text-sm">
          <Filter size={14} />
          <span>Filter:</span>
        </div>
        {["all", "unread", "NEW_VENDOR", "NEW_ORDER", "NEW_PRODUCT", "SYSTEM"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === f 
                ? "bg-[#BEF264] text-black" 
                : "bg-[#27272A] text-[#A1A1AA] hover:bg-[#3f3f46]"
            }`}
          >
            {f === "all" ? "All" : f === "unread" ? "Unread" : getTypeLabel(f)}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-2xl overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="mx-auto mb-4 text-[#3f3f46]" size={48} />
            <h3 className="text-lg font-medium text-white mb-1">No Notifications</h3>
            <p className="text-[#71717A] text-sm">
              {filter === "all" 
                ? "You're all caught up! No notifications at the moment." 
                : `No ${filter === "unread" ? "unread" : filter.toLowerCase().replace('_', ' ')} notifications.`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#27272A]">
            {filteredNotifications.map(notif => (
              <div 
                key={notif.id}
                className={`p-5 hover:bg-[#27272A]/50 transition-colors ${
                  !notif.is_read ? "bg-[#BEF264]/5" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getNotificationIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{notif.title}</h3>
                      {!notif.is_read && (
                        <span className="w-2 h-2 bg-[#BEF264] rounded-full" />
                      )}
                      <span className="text-xs px-2 py-0.5 bg-[#27272A] text-[#A1A1AA] rounded-full">
                        {getTypeLabel(notif.type)}
                      </span>
                    </div>
                    
                    <p className="text-[#A1A1AA] text-sm mb-2">{notif.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#71717A]">
                        {new Date(notif.created_at).toLocaleString()}
                      </span>
                      
                      {!notif.is_read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="flex items-center gap-1 text-xs text-[#BEF264] hover:underline"
                        >
                          <Check size={12} />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
