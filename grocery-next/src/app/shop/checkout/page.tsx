'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, Shield } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useAuth } from '../../../hooks/useAuth';
import { Address, DeliverySlot, PaymentMethod as PaymentMethodType } from '../../../lib/types';
import { AddressSelector } from '../../../components/shop/AddressSelector';
import { DeliverySlotSelector } from '../../../components/shop/DeliverySlotSelector';
import { PaymentMethod } from '../../../components/shop/PaymentMethod';
import { OrderSummary } from '../../../components/shop/OrderSummary';
import { Button } from '../../../components/ui/Button';
import { EmptyState } from '../../../components/common/EmptyState';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [deliverySlot, setDeliverySlot] = useState<DeliverySlot | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = deliverySlot?.fee || 20;
  const discount = 0; // In a real app, this would be calculated based on coupon code
  const total = subtotal + deliveryFee - discount;

  // Mock addresses for demo
  const mockAddresses: Address[] = user?.addresses || [
    {
      id: '1',
      type: 'home',
      name: 'Home',
      phone: '+91 98765 43210',
      address: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      name: 'Office',
      phone: '+91 98765 43210',
      address: '456 Business Park',
      addressLine2: 'Sector 12',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      isDefault: false,
    },
  ];

  const handleAddAddress = (address: Omit<Address, 'id' | 'isDefault'>) => {
    // In a real app, this would make an API call to add the address
    console.log('Adding address:', address);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress || !deliverySlot || !paymentMethod) {
      alert('Please complete all required fields');
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Clear cart and redirect to order confirmation
      clearCart();
      router.push('/shop/order-confirmation');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="Your cart is empty"
          description="Add some products to your cart before checking out"
          actionText="Continue Shopping"
          actionHref="/shop"
          icon={<Truck className="h-12 w-12 text-gray-400" />}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <AddressSelector
            addresses={mockAddresses}
            selectedAddress={selectedAddress}
            onSelectAddress={setSelectedAddress}
            onAddAddress={handleAddAddress}
          />
          
          {/* Delivery Slot */}
          <DeliverySlotSelector
            onSelectSlot={setDeliverySlot}
          />
          
          {/* Payment Method */}
          <PaymentMethod
            selectedMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
          />
        </div>
        
        {/* Order Summary */}
        <div>
          <OrderSummary
            items={cartItems}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
          />
          
          <Button
            onClick={handlePlaceOrder}
            isLoading={isProcessing}
            disabled={!selectedAddress || !deliverySlot || !paymentMethod || isProcessing}
            className="w-full mt-6"
          >
            {isProcessing ? 'Processing Order...' : 'Place Order'}
          </Button>
          
          {/* Security Info */}
          <div className="mt-6 card p-4 text-center">
            <div className="flex justify-center">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-medium mt-2">Secure Checkout</h3>
            <p className="text-sm text-gray-600 mt-1">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}