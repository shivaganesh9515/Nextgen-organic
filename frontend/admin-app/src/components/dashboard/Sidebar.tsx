"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileCheck, Settings, LogOut, Package, ShoppingCart, Percent, Store } from "lucide-react";
import Image from "next/image";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

interface SidebarProps {
  role: "admin" | "vendor";
}

const adminItems: SidebarItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Vendors", href: "/admin/vendors", icon: Store },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FileCheck },
  { label: "Banners", href: "/admin/banners", icon: FileCheck },
  { label: "Offers", href: "/admin/offers", icon: Percent },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const vendorItems: SidebarItem[] = [
  { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
  { label: "My Products", href: "/vendor/products", icon: Package },
  { label: "Orders", href: "/vendor/orders", icon: ShoppingCart },
  { label: "Profile", href: "/vendor/settings", icon: Settings },
];

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const items = role === "admin" ? adminItems : vendorItems;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#18181B] border-r border-[#27272A] flex flex-col z-50">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-[#27272A]">
        <div className="font-heading font-bold text-xl text-white tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#BEF264] flex items-center justify-center text-black">
             <LayoutDashboard size={18} strokeWidth={2.5} />
          </div>
          Next360
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#BEF264] text-black shadow-[0_0_15px_rgba(190,242,100,0.2)]"
                  : "text-[#A1A1AA] hover:text-white hover:bg-[#27272A]"
              }`}
            >
              <item.icon size={18} className={isActive ? "text-black" : "text-[#71717A] group-hover:text-white"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-[#27272A] m-2">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-all bg-[#18181B] border border-[#27272A]">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
