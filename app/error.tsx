'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Something went wrong!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            We{`'`}re sorry, but something went wrong on our end.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p className="mt-4 text-sm text-red-600">
              Error: {error.message}
            </p>
          )}
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}