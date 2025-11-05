'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  RotateCcw, 
  Shield, 
  Clock, 
  Package,
  Truck,
  CheckCircle
} from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Return Policy</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Hassle-free returns and exchanges
        </p>

        {/* Return Policy Overview */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-600" />
                Our Return Guarantee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                At Nextgen Organics, we want you to be completely satisfied with your purchase. 
                If for any reason you{`'`}re not happy with your order, we{`'`}ll make it right.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold">30-Day Window</h3>
                  <p className="text-sm text-gray-600">Return within 30 days</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold">Free Returns</h3>
                  <p className="text-sm text-gray-600">We cover shipping</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold">Full Refund</h3>
                  <p className="text-sm text-gray-600">Money back guarantee</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How to Return */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How to Return Your Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Online Returns
                </CardTitle>
                <CardDescription>Most convenient option</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Log into your account</li>
                  <li>Go to Order History</li>
                  <li>Select items to return</li>
                  <li>Print return label</li>
                  <li>Drop off at any carrier location</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  In-Store Returns
                </CardTitle>
                <CardDescription>For local customers</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Bring items to any Nextgen Organics location</li>
                  <li>Have your order number or ID ready</li>
                  <li>Items must be in original condition</li>
                  <li>Get refund within 24 hours</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Return Eligibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What Can Be Returned?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Eligible Items</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Unopened products in original packaging</li>
                  <li>Perishable items within expiration date</li>
                  <li>Damaged or defective items</li>
                  <li>Wrong items received</li>
                  <li>Items not as described</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Non-Eligible Items</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Opened perishable items</li>
                  <li>Items past expiration date</li>
                  <li>Personal care items</li>
                  <li>Custom or special order items</li>
                  <li>Gift cards</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Refund Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Refund Information</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Processing Time</h3>
                  <p className="text-gray-600">
                    Refunds processed within 5-7 business days after we receive your return.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Refund Method</h3>
                  <p className="text-gray-600">
                    Original payment method will be used for refund.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Store Credit</h3>
                  <p className="text-gray-600">
                    Option to receive store credit for faster processing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Need Help with Returns?</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Our customer service team is available 24/7 to assist with returns and exchanges.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/contact">
                      Contact Support
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/faq">
                      View FAQ
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/shop">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}