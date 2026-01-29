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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-[#F5F5F0]/80 backdrop-blur-md border-[#E5E5E0] py-4 shadow-sm"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-500 border-2 border-transparent group-hover:border-[#4A6741]/20">
               <Image 
                 src="/logo.png" 
                 alt="Next360 Logo" 
                 fill 
                 className="object-cover" 
                 priority
               />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl leading-none tracking-tight text-[#262A2B]">
                Next360
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#4A6741] font-medium">
                Organics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 relative",
                  pathname === link.href
                    ? "text-[#4A6741]"
                    : "text-[#262A2B]/80 hover:text-[#4A6741]"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#4A6741]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">

            <Link
              href="/"
              className="px-5 py-2.5 bg-[#4A6741] text-white text-sm font-medium rounded-full shadow-lg hover:bg-[#3D5536] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Get the App
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#262A2B] hover:text-[#4A6741] transition-colors"
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
                href="/"
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
