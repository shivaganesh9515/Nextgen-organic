import NextAuth, { User, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';

interface CustomUser extends User {
  role?: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // For development, return a mock user
        // In production, you would validate credentials against your database
        return {
          id: '1',
          email: credentials.email,
          name: 'Test User',
          role: 'user',
        } as CustomUser;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        (session.user as CustomUser).id = token.id as string;
        (session.user as CustomUser).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };