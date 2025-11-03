import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import OrganicHeader from '@/components/layout/OrganicHeader';
import Footer from '@/components/layout/Footer';
import AuthProvider from '@/components/auth/AuthProvider';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DailyPick - Fresh Organic Groceries Delivered',
  description: 'Get fresh, organic groceries delivered to your doorstep',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <OrganicHeader />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}