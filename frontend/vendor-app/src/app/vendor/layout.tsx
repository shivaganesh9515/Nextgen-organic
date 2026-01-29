"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, Package, ShoppingBag, Settings, Tractor, LogOut, Loader2, Bell, X } from "lucide-react";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [vendorName, setVendorName] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("vendor_name");
    if (storedName) {
      setVendorName(storedName);
    } else {
      fetchVendorProfile();
    }
    
    fetchUnreadCount();
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchVendorProfile = async () => {
    try {
      const token = localStorage.getItem("vendor_token");
      if (!token) {
        setVendorName("Farm Dashboard");
        return;
      }
      
      const res = await fetch("http://localhost:8000/api/v1/vendor/me/profile", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        const name = data.business_name || "My Farm";
        setVendorName(name);
        localStorage.setItem("vendor_name", name);
      } else {
        setVendorName("Farm Dashboard");
      }
    } catch (error) {
      setVendorName("Farm Dashboard");
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("vendor_token");
      if (!token) return;
      
      const res = await fetch("http://localhost:8000/api/v1/notifications/unread-count", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unread_count);
      }
    } catch (error) {
      console.error("Failed to fetch unread count", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("vendor_token");
      if (!token) return;
      
      const res = await fetch("http://localhost:8000/api/v1/notifications", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.slice(0, 5)); // Show only first 5 in dropdown
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const handleBellClick = () => {
    if (!showNotifications) {
      fetchNotifications();
    }
    setShowNotifications(!showNotifications);
  };

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem("vendor_token");
      if (!token) return;
      
      await fetch(`http://localhost:8000/api/v1/notifications/${id}/read`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      
      // Update local state
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const handleSignOut = () => {
    setIsLoading(true);
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("vendor_name");
    router.push("/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/vendor" },
    { icon: Package, label: "Products", href: "/vendor/products" },
    { icon: ShoppingBag, label: "Orders", href: "/vendor/orders" },
    { icon: Bell, label: "Notifications", href: "/vendor/notifications" },
    { icon: Tractor, label: "My Farm", href: "/vendor/farm" },
    { icon: Settings, label: "Settings", href: "/vendor/settings" },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "SYSTEM": return "⚠️";
      case "BEST_SELLER": return "🌟";
      case "PROMOTION": return "🎉";
      default: return "📩";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#09090B]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#18181B] border-r border-[#27272A] flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
             <div className="w-11 h-11 bg-gradient-to-br from-[#BEF264] to-[#84cc16] rounded-xl flex items-center justify-center text-black shadow-lg shadow-[#BEF264]/20">
               <Tractor size={22} />
             </div>
             <div className="flex-1 min-w-0">
               <h1 className="font-bold text-white truncate" title={vendorName}>{vendorName}</h1>
               <p className="text-xs text-[#71717A]">Vendor Portal</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/vendor" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#BEF264] text-black font-bold shadow-md shadow-[#BEF264]/20"
                    : "text-[#A1A1AA] hover:bg-[#27272A] hover:text-white"
                }`}
              >
                <div className="relative">
                  <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                  {item.label === "Notifications" && unreadCount > 0 && !isActive && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                  )}
                </div>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#27272A]">
           <button 
             onClick={handleSignOut}
             disabled={isLoading}
             className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
           >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
              Sign Out
           </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 border-b border-[#27272A] bg-[#18181B] px-8 flex items-center justify-end sticky top-0 z-30">
             {/* Notification Bell */}
             <div className="relative" ref={notifRef}>
               <button 
                 onClick={handleBellClick}
                 className="relative p-2 rounded-lg hover:bg-[#27272A] transition-colors"
               >
                 <Bell size={20} className="text-[#A1A1AA] hover:text-white transition-colors" />
                 {unreadCount > 0 && (
                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-[#18181B]">
                     {unreadCount > 9 ? "9+" : unreadCount}
                   </span>
                 )}
               </button>
               
               {/* Notification Dropdown */}
               {showNotifications && (
                 <div className="absolute right-0 top-12 w-80 bg-[#18181B] border border-[#27272A] rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                   <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
                     <h3 className="font-semibold text-white">Notifications</h3>
                     <button onClick={() => setShowNotifications(false)} className="text-[#71717A] hover:text-white">
                       <X size={18} />
                     </button>
                   </div>
                   
                   <div className="max-h-80 overflow-y-auto">
                     {notifications.length === 0 ? (
                       <div className="p-8 text-center text-[#71717A] text-sm">
                         No notifications yet
                       </div>
                     ) : (
                       notifications.map(notif => (
                         <div 
                           key={notif.id}
                           onClick={() => !notif.is_read && markAsRead(notif.id)}
                           className={`p-4 border-b border-[#27272A] cursor-pointer hover:bg-[#27272A] transition-colors ${
                             !notif.is_read ? "bg-[#27272A]/30" : ""
                           }`}
                         >
                           <div className="flex items-start gap-3">
                             <div className="mt-1">
                                <span className="text-lg">{getNotificationIcon(notif.type)}</span>
                             </div>
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between gap-2 mb-1">
                                 <h4 className={`text-sm font-medium truncate ${!notif.is_read ? 'text-white' : 'text-[#A1A1AA]'}`}>
                                    {notif.title}
                                 </h4>
                                 {!notif.is_read && <span className="w-2 h-2 bg-[#BEF264] rounded-full flex-shrink-0" />}
                               </div>
                               <p className="text-xs text-[#A1A1AA] line-clamp-2 mb-1">{notif.message}</p>
                               <p className="text-[10px] text-[#52525B]">
                                 {new Date(notif.created_at).toLocaleString()}
                               </p>
                             </div>
                           </div>
                         </div>
                       ))
                     )}
                   </div>
                   
                   <Link 
                     href="/vendor/notifications" 
                     onClick={() => setShowNotifications(false)}
                     className="block p-3 text-center text-xs text-[#BEF264] hover:text-white bg-[#27272A]/30 hover:bg-[#27272A] transition-colors border-t border-[#27272A]"
                   >
                     View All Notifications
                   </Link>
                 </div>
               )}
             </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
               {children}
            </div>
        </main>
      </div>
    </div>
  );
}
