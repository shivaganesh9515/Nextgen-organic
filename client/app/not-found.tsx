'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Page not found
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Sorry, we couldn{`'`}t find the page you{`'`}re looking for.
          </p>
        </div>
        
        <div className="mt-8">
          <div className="inline-flex rounded-md shadow">
            <Button asChild className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Go back home
              </Link>
            </Button>
          </div>
          <div className="mt-3 inline-flex">
            <Button asChild variant="outline" className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200">
              <Link href="/shop">
                <Search className="w-5 h-5 mr-2" />
                Browse products
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <Link href="javascript:history.back()" className="text-base font-medium text-green-600 hover:text-green-500 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Go back to previous page
          </Link>
        </div>
      </div>
    </div>
  );
}