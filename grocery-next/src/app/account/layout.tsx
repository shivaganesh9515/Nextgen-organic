'use client';

import { useAuth } from '../../hooks/useAuth';
import { AccountSidebar } from '../../components/account/AccountSidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary-600 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    // In a real app, you would redirect to login page
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="mt-2 text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <AccountSidebar />
        </div>
        <div className="lg:w-3/4">
          {children}
        </div>
      </div>
    </div>
  );
}