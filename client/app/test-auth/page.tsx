'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { signIn, signOut } from 'next-auth/react';

interface CustomUser {
  role?: string;
}

export default function TestAuthPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Authentication Test</h1>
      
      {session ? (
        <div className="space-y-4">
          <p>Signed in as {session.user?.email}</p>
          <p>User role: {(session.user as CustomUser)?.role || 'No role assigned'}</p>
          <Button onClick={() => signOut()}>Sign out</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p>Not signed in</p>
          <Button onClick={() => signIn('credentials', { callbackUrl: '/test-auth' })}>
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
}