'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ApplyCoupon() {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    // In a real app, you would validate the coupon code
    if (couponCode.trim()) {
      alert(`Coupon code "${couponCode}" applied!`);
      setCouponCode('');
    }
  };

  return (
    <div>
      <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
        Coupon Code
      </label>
      <div className="flex">
        <Input 
          id="coupon" 
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code" 
          className="rounded-r-none" 
        />
        <Button 
          variant="outline" 
          className="rounded-l-none"
          onClick={handleApplyCoupon}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}