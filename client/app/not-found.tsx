'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Search, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full shadow-2xl border-0 text-center">
        <CardHeader>
          <div className="mx-auto mb-6">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              404
            </h1>
          </div>
          <CardTitle className="text-3xl font-bold mb-2">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-gray-600">
            Don&apos;t worry! Let&apos;s get you back on track. Here are some helpful links:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="organic" className="w-full" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/products">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Browse Products
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/vendors">
                <Search className="w-4 h-4 mr-2" />
                Find Vendors
              </Link>
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/about/organic" className="text-sm text-green-600 hover:text-green-700 hover:underline">
                About Organic
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/contact" className="text-sm text-green-600 hover:text-green-700 hover:underline">
                Contact Us
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/faq" className="text-sm text-green-600 hover:text-green-700 hover:underline">
                FAQ
              </Link>
              <span className="text-gray-300">•</span>
              <Link href="/auth/login" className="text-sm text-green-600 hover:text-green-700 hover:underline">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}