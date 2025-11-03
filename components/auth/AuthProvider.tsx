'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { login, logout } = useAuthStore();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      login({
        id: '1',
        name: session.user.name || 'User',
        email: session.user.email || '',
        role: 'user',
        profilePicture: session.user.image || '',
      });
    } else if (status === 'unauthenticated') {
      logout();
    }
  }, [status, session, login, logout]);

  return <>{children}</>;
}