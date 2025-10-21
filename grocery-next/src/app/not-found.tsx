'use client';

import Link from 'next/link';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-gray-900 tracking-tight">
            404
          </h1>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Sorry, we couldn{`'`}t find the page you{`'`}re looking for.
          </p>
        </div>
        
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button>
              <Link href="/" className="block w-full">
                Go Home
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="/shop" className="block w-full">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}