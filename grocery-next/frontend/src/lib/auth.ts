import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Mock user data for development
const mockUsers = [
  {
    id: '1',
    email: 'admin@organicnext.com',
    password: 'password123', // In real app, this would be hashed
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN',
    emailVerified: true,
    vendorId: null,
    vendorStatus: null,
    isActive: true
  },
  {
    id: '2',
    email: 'customer1@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'CUSTOMER',
    emailVerified: true,
    vendorId: null,
    vendorStatus: null,
    isActive: true
  },
  {
    id: '3',
    email: 'vendor1@example.com',
    password: 'password123',
    firstName: 'Raj',
    lastName: 'Kumar',
    role: 'VENDOR',
    emailVerified: true,
    vendorId: '1',
    vendorStatus: 'APPROVED',
    isActive: true
  }
];

export const authOptions: NextAuthOptions = {
  // Remove the adapter to avoid version conflicts
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    newUser: '/auth/welcome',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Find user in mock data
        const user = mockUsers.find(u => u.email === credentials.email);

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Check if user is active
        if (!user.isActive) {
          throw new Error('Your account has been deactivated');
        }

        // Verify password (in real app, use bcrypt.compare)
        if (credentials.password !== user.password) {
          throw new Error('Invalid email or password');
        }

        // Return user data
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          emailVerified: user.emailVerified,
          vendorId: user.vendorId,
          vendorStatus: user.vendorStatus,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.emailVerified = user.emailVerified ? true : false;
        token.vendorId = user.vendorId;
        token.vendorStatus = user.vendorStatus;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
        session.user.vendorId = token.vendorId as string | null;
        session.user.vendorStatus = token.vendorStatus as string | null;
      }
      return session;
    },
    // 🔥 FIX: Role-based redirect after login
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      
      return baseUrl;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};