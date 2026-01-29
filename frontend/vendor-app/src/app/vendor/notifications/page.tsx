"use client";

import { useState, useEffect } from "react";
import { Bell, Check, CheckCheck, Filter, Loader2 } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  metadata?: Record<string, any>;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("vendor_token");
      if (!token) return;
      
      const res = await fetch("http://localhost:8000/api/v1/notifications", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem("vendor_token");
      if (!token) return;
      
      await fetch(`http://localhost:8000/api/v1/notifications/${id}/read`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllRead = async () => {
    try {
      const token = localStorage.getItem("vendor_token");
      if (!token) return;
      
      await fetch("http://localhost:8000/api/v1/notifications/mark-all-read", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "SYSTEM": return "⚠️";
      case "BEST_SELLER": return "🌟";
      case "PROMOTION": return "🎉";
      default: return "📩";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "SYSTEM": return "System";
      case "BEST_SELLER": return "Best Seller";
      case "PROMOTION": return "Promotion";
      case "MESSAGE": return "Message";
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
    <div className="space-y-6">
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
        {["all", "unread", "SYSTEM", "MESSAGE", "BEST_SELLER", "PROMOTION"].map(f => (
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
                : `No ${filter === "unread" ? "unread" : filter.toLowerCase()} notifications.`}
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
                  <span className="text-2xl">{getNotificationIcon(notif.type)}</span>
                  
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
