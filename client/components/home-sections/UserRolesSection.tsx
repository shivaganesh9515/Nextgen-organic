'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserRolesSection() {
  const roles = [
    {
      title: "Customers",
      description: "Shop fresh groceries from local vendors with fast delivery.",
      icon: (
        <svg className="w-8 h-8 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      ),
      link: "/register",
      linkText: "Sign Up as Customer"
    },
    {
      title: "Vendors",
      description: "Sell your products to a wider audience with our platform.",
      icon: (
        <svg className="w-8 h-8 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      link: "/vendor-register",
      linkText: "Register as Vendor"
    },
    {
      title: "Admin",
      description: "Manage the platform, vendors, and products.",
      icon: (
        <svg className="w-8 h-8 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      link: "/admin/dashboard",
      linkText: "Admin Dashboard"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-bg-light to-bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Platform for Everyone</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of customers, vendors, and administrators working together for a sustainable future
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all transform hover:-translate-y-2 border border-border-light">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {role.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
              <p className="text-gray-600 mb-4">
                {role.description}
              </p>
              <Button variant="outline" className="border-primary-green text-primary-green hover:bg-primary-green hover:text-white" asChild>
                <Link href={role.link}>{role.linkText}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}