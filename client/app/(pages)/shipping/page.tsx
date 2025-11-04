'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  Truck, 
  Clock, 
  Shield, 
  RotateCcw, 
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Shipping Information</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Fast, reliable delivery right to your doorstep
        </p>

        {/* Delivery Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Delivery Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Standard Delivery</CardTitle>
                <CardDescription>3-5 business days</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">$4.99</p>
                <p className="text-gray-600">Delivered to your doorstep within 3-5 business days.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Express Delivery</CardTitle>
                <CardDescription>1-2 business days</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">$9.99</p>
                <p className="text-gray-600">Priority delivery for when you need your items fast.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Same-Day Delivery</CardTitle>
                <CardDescription>Within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">$14.99</p>
                <p className="text-gray-600">Get your items delivered the same day in select areas.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Delivery Policies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Delivery Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Free Returns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Not satisfied with your purchase? Return it within 30 days for a full refund. 
                  We{`'`}ll even cover the return shipping costs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Delivery Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  If your delivery is late, we{`'`}ll refund the shipping cost. 
                  We{`'`}re committed to getting your products to you on time.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>What areas do you deliver to?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We currently deliver to all major metropolitan areas. 
                  Enter your zip code at checkout to see if we deliver to your area.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can I track my order?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you{`'`}ll receive tracking information via email once your order ships. 
                  You can also track your order in real-time through your account dashboard.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What if I{`'`}m not home when delivery arrives?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our delivery partners will leave your package in a secure location if you{`'`}re not home. 
                  You can also specify delivery instructions during checkout.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Need Help with Shipping?</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">Phone Support</h3>
                  <p className="text-gray-600">1-800-DAILYPICK</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">Email Support</h3>
                  <p className="text-gray-600">support@dailypick.com</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">Live Chat</h3>
                  <p className="text-gray-600">Available 24/7</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/shop">
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}