"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Calendar, User, LogOut, Settings, ChevronDown, Check, ShoppingCart, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { adminApi } from "@/lib/api";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  extra_data?: any;
};

export function AdminNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
            setShowNotifications(false);
        }
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setShowProfile(false);
        }
        if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
            setShowCalendar(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
      try {
          const data = await adminApi.getNotifications();
          setNotifications(data as unknown as Notification[]); // Cast if needed, or update api.ts return type
          const countData = await adminApi.getUnreadCount();
          setUnreadCount(countData.unread_count);
      } catch (e) {
          console.error("Failed to fetch notifications", e);
      }
  };

  useEffect(() => {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
      return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token"); // Clear token
    router.push("/admin/login");
  };
  
  const handleMarkRead = async (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      await adminApi.markRead(id);
      fetchNotifications();
  };
  
  const handleMarkAllRead = async () => {
      await adminApi.markAllRead();
      fetchNotifications();
  };

  const getIconForType = (type: string) => {
      switch(type) {
          case 'NEW_VENDOR': return <User size={16} className="text-blue-400" />;
          case 'NEW_ORDER': return <ShoppingCart size={16} className="text-[#BEF264]" />;
          case 'NEW_PRODUCT': return <Package size={16} className="text-purple-400" />;
          default: return <Bell size={16} className="text-gray-400" />;
      }
  }

  return (
    <header className="h-20 border-b border-[#27272A] bg-[#18181B] px-8 flex items-center justify-between sticky top-0 z-40">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
            <input 
            type="text" 
            placeholder="Search or ask a question..." 
            className="w-full bg-[#27272A] border border-[#3F3F46] rounded-full pl-12 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#BEF264] transition-colors placeholder:text-[#52525B]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#3F3F46] rounded text-[10px] text-[#A1A1AA]">CTRL K</div>
        </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 border-r border-[#27272A] pr-6">
            
            {/* Calendar */}
            <div className="relative" ref={calendarRef}>
                <button 
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={`p-2 hover:text-white transition-colors relative ${showCalendar ? "text-[#BEF264]" : "text-[#A1A1AA]"}`}
                >
                    <Calendar size={20} />
                </button>
                
                {showCalendar && (
                    <div className="absolute top-full right-0 mt-4 w-72 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl p-4 animate-in fade-in slide-in-from-top-2 origin-top-right">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white">Today</h3>
                            <span className="text-xs text-[#BEF264]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-[#27272A] p-3 rounded-xl flex gap-3 items-center">
                                <div className="w-1 h-8 bg-blue-500 rounded-full" />
                                <div>
                                    <div className="text-sm text-white font-medium">Team Meeting</div>
                                    <div className="text-xs text-[#A1A1AA]">10:00 AM - 11:00 AM</div>
                                </div>
                            </div>
                            <div className="bg-[#27272A] p-3 rounded-xl flex gap-3 items-center">
                                <div className="w-1 h-8 bg-[#BEF264] rounded-full" />
                                <div>
                                    <div className="text-sm text-white font-medium">Vendor Reviews</div>
                                    <div className="text-xs text-[#A1A1AA]">02:00 PM - 04:00 PM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
                <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2 hover:text-white transition-colors relative ${showNotifications ? "text-[#BEF264]" : "text-[#A1A1AA]"}`}
                >
                    {unreadCount > 0 && <div className="absolute top-2 right-2 w-2 h-2 bg-[#BEF264] rounded-full border border-[#18181B] animate-pulse" />}
                    <Bell size={20} />
                </button>

                {showNotifications && (
                    <div className="absolute top-full right-0 mt-4 w-96 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
                        <div className="flex justify-between items-center p-4 border-b border-[#27272A]">
                            <h3 className="font-bold text-white">Notifications</h3>
                            <button onClick={handleMarkAllRead} className="text-xs text-[#BEF264] hover:underline">Mark all read</button>
                        </div>
                        <div className="max-h-[350px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-[#71717A] text-sm">No notifications</div>
                            ) : (
                                notifications.map((notif) => (
                                    <div 
                                        key={notif.id} 
                                        className={`p-4 border-b border-[#27272A] last:border-0 hover:bg-[#27272A] transition-colors cursor-pointer group relative ${!notif.is_read ? 'bg-[#27272A]/30' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="mt-1">
                                                {getIconForType(notif.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className={`text-sm font-medium transition-colors ${!notif.is_read ? 'text-white' : 'text-[#A1A1AA]'}`}>
                                                        {notif.title}
                                                    </p>
                                                    {!notif.is_read && (
                                                        <button 
                                                            onClick={(e) => handleMarkRead(notif.id, e)}
                                                            className="text-[10px] text-[#BEF264] hover:underline ml-2 flex-shrink-0"
                                                        >
                                                            Mark read
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-xs text-[#71717A] mb-1 line-clamp-2">{notif.message}</p>
                                                <p className="text-[10px] text-[#52525B]">
                                                    {new Date(notif.created_at).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="p-3 bg-[#27272A]/50 text-center border-t border-[#27272A]">
                            <Link href="/admin/notifications" className="text-xs text-[#A1A1AA] hover:text-white block w-full">View all history</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        {/* Profile */}
        <div className="relative" ref={profileRef}>
            <div 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 cursor-pointer group select-none"
            >
                <div className="w-10 h-10 rounded-full bg-[#27272A] border border-[#3F3F46] overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-white group-hover:text-[#BEF264] transition-colors">Admin User</div>
                    <div className="text-xs text-[#71717A]">Super Admin</div>
                </div>
                <ChevronDown size={16} className={`text-[#71717A] group-hover:text-white transition-all duration-200 ${showProfile ? "rotate-180" : ""}`} />
            </div>

            {showProfile && (
                <div className="absolute top-full right-0 mt-4 w-56 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 origin-top-right">
                    <div className="p-2 space-y-1">
                        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-[#E4E4E7] hover:bg-[#27272A] rounded-xl transition-colors">
                            <User size={16} /> My Profile
                        </Link>
                        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-[#E4E4E7] hover:bg-[#27272A] rounded-xl transition-colors">
                            <Settings size={16} /> Settings
                        </Link>
                        <div className="h-px bg-[#27272A] my-1" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                            <LogOut size={16} /> Log Out
                        </button>
                    </div>
                </div>
            )}
        </div>
        </div>
    </header>
  );
}
