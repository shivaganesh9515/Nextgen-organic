import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push('/');
    }

    return result;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
    login,
    logout,
  };
}