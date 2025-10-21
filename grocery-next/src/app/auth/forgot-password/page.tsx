'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful request
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSubmitted ? 'Check your email' : 'Forgot your password?'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSubmitted ? (
              "We've sent password reset instructions to your email."
            ) : (
              "Enter your email address and we'll send you a link to reset your password."
            )}
          </p>
        </div>
        
        <div className="card">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Password reset email sent</h3>
              <p className="mt-2 text-sm text-gray-500">
                Please check your email for instructions to reset your password.
              </p>
              <div className="mt-6">
                <Link href="/auth/signin" className="font-medium text-primary-600 hover:text-primary-500">
                  Return to sign in
                </Link>
              </div>
            </div>
          ) : (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <div>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Send Reset Link
                </Button>
              </div>
              
              <div className="text-sm text-center">
                <Link href="/auth/signin" className="font-medium text-primary-600 hover:text-primary-500">
                  Return to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}