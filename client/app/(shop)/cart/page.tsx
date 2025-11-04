'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, ArrowRight, ShoppingBag, Leaf } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import ecommerceComponents from '@/components/ecommerce-components-v3';

const { ShoppingCartPage } = ecommerceComponents;

export default function CartPage() {
  const { items, getTotalItems } = useCartStore();

  // Show empty cart state
  if (items.length === 0 || getTotalItems() === 0) {
    return (
      <div className="min-h-screen bg-nature-pattern py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="card-organic shadow-xl border-2 border-[#d4c4a8] text-center py-12">
            <CardContent className="pt-6">
              <div className="mx-auto mb-6 w-24 h-24 bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-full flex items-center justify-center border-2 border-[#d4c4a8]/50">
                <ShoppingCart className="w-12 h-12 text-[#4a7c59]" />
              </div>
              <CardTitle className="text-3xl font-bold mb-4 text-[#2d5016]">Your Cart is Empty</CardTitle>
              <CardDescription className="text-lg mb-8 text-[#5a5a5a]">
                Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up with organic goodness!
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="organic" size="lg" asChild>
                  <Link href="/products">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Browse Organic Products
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Products */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-center text-[#2d5016] flex items-center justify-center gap-2">
              <Leaf className="w-5 h-5 text-[#4a7c59]" />
              You might also like
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Add suggested products here */}
              <Card className="card-organic hover:shadow-lg transition-shadow cursor-pointer border-2 border-[#d4c4a8]/50 hover:border-[#87a96b]">
                <CardHeader>
                  <div className="aspect-square bg-gradient-to-br from-[#e8f5e9] to-[#c8e6c9] rounded-xl mb-4 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-[#4a7c59]" />
                  </div>
                  <CardTitle className="text-sm text-[#2d5016]">Organic Apples</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold text-[#4a7c59]">$2.99</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show cart with items
  return <ShoppingCartPage />;
}