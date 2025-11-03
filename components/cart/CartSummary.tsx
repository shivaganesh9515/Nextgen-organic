'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartSummary() {
  const { getTotalItems, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({getTotalItems()} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div>
          <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
            Coupon Code
          </label>
          <div className="flex">
            <Input id="coupon" placeholder="Enter coupon code" className="rounded-r-none" />
            <Button variant="outline" className="rounded-l-none">
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" size="lg" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}