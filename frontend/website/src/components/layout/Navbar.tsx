"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "For Vendors", href: "/vendors" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-6 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-4",
          isScrolled ? "pointer-events-none" : ""
        )}
      >
        <div 
           className={cn(
             "w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-500",
             isScrolled 
               ? "bg-[#262A2B]/90 backdrop-blur-xl border border-white/10 rounded-full py-3 px-6 shadow-2xl pointer-events-auto max-w-5xl" 
               : "bg-transparent py-4 px-0"
           )}
        >
          {/* Logo Area */}
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={cn(
               "relative transition-all duration-500 flex items-center justify-center rounded-full overflow-hidden shadow-md",
               isScrolled ? "h-16 w-16" : "h-24 w-24"
            )}>
               <Image 
                 src="/final-logo.png" 
                 alt="Next360 Logo" 
                 fill
                 className="object-cover scale-[1.75]" 
                 priority
                 unoptimized
               />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group overflow-hidden",
                  pathname === link.href
                    ? (isScrolled ? "text-[#4A6741] bg-white" : "text-[#4A6741] bg-[#4A6741]/10")
                    : (isScrolled ? "text-[#F5F5F0] hover:bg-white/10" : "text-[#262A2B]/80 hover:bg-[#262A2B]/5")
                )}
              >
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/coming-soon"
              className={cn(
                 "px-5 py-2.5 text-sm font-medium rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
                 isScrolled 
                   ? "bg-[#E23744] text-white hover:bg-[#D12D39]" 
                   : "bg-[#262A2B] text-white hover:bg-[#4A6741]"
              )}
            >
              Get the App
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
               "md:hidden p-2 transition-colors rounded-full",
               isScrolled ? "text-[#F5F5F0] hover:bg-white/10" : "text-[#262A2B] hover:bg-black/5"
            )}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[70px] z-40 bg-[#F5F5F0] md:hidden px-6 py-8 border-t border-[#E5E5E0]"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-heading font-semibold text-[#262A2B] hover:text-[#4A6741] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-[#E5E5E0] my-2" />

              <Link
                href="/coming-soon"
                className="w-full py-4 bg-[#4A6741] text-white text-center font-bold rounded-xl shadow-lg"
              >
                Get the App
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
