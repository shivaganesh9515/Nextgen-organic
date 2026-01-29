"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Settings, Store, LogOut } from "lucide-react";

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/vendor" },
    { icon: Package, label: "Products", href: "/vendor/products" },
    { icon: ShoppingBag, label: "Orders", href: "/vendor/orders" },
    { icon: Store, label: "My Farm", href: "/vendor/settings" },
    { icon: Settings, label: "Settings", href: "/vendor/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-[#09090B]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#18181B] border-r border-[#27272A] flex flex-col fixed h-full z-10">
        <div className="p-8 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-[#BEF264] rounded-xl flex items-center justify-center text-black">
                <Store size={20} />
             </div>
             <div>
                <h1 className="font-bold text-white">NextGen</h1>
                <p className="text-xs text-[#71717A]">Vendor Portal</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#BEF264] text-black font-bold"
                    : "text-[#A1A1AA] hover:bg-[#27272A] hover:text-white"
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#27272A]">
           <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut size={20} />
              Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
           {children}
        </div>
      </main>
    </div>
  );
}
