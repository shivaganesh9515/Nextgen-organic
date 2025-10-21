'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Address } from '../../../lib/types';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      setTimeout(() => {
        // Mock user data
        const mockUser = {
          id: '1',
          name: 'Shivaganesh Gajavelli',
          email: formData.email,
          phone: '+91 98765 43210',
          avatar: '/images/users/user1.jpg',
          addresses: [
            {
              id: 'a1',
              type: 'home',
              name: 'Home',
              phone: '+91 98765 43210',
              address: '123 Main Street',
              addressLine2: 'Apartment 4B',
              city: 'Mumbai',
              state: 'Maharashtra',
              pincode: '400001',
              isDefault: true,
            } as Address,
          ],
          orders: [],
          wishlist: [],
        };
        
        login(mockUser);
        router.push('/account');
      }, 1000);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
              >
                Sign in
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <Button variant="secondary" className="w-full">
                  <span className="sr-only">Sign in with Facebook</span>
                  f
                </Button>
              </div>
              
              <div>
                <Button variant="secondary" className="w-full">
                  <span className="sr-only">Sign in with Google</span>
                  G
                </Button>
              </div>
              
              <div>
                <Button variant="secondary" className="w-full">
                  <span className="sr-only">Sign in with Twitter</span>
                  T
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}