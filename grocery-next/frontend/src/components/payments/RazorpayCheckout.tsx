'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';

interface RazorpayCheckoutProps {
  orderDetails: {
    amount: number;
    currency: string;
    orderId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  onSuccess: (paymentResponse: unknown) => void;
  onFailure: (error: string) => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: unknown) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

export const RazorpayCheckout = ({ orderDetails, onSuccess, onFailure }: RazorpayCheckoutProps) => {
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be an API call to your backend
      // to create an order with Razorpay
      const order = {
        id: orderDetails.orderId,
        amount: orderDetails.amount * 100, // Convert to paise
        currency: orderDetails.currency,
      };

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXX',
        amount: order.amount,
        currency: order.currency,
        name: 'OrganicNext',
        description: 'Order Payment',
        order_id: order.id,
        handler: function (response: unknown) {
          // Verify payment on backend in a real application
          verifyPayment(response);
        },
        prefill: {
          name: orderDetails.customerName,
          email: orderDetails.customerEmail,
          contact: orderDetails.customerPhone,
        },
        theme: {
          color: '#22C55E', // Green organic theme
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
            onFailure('Payment cancelled by user');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setIsLoading(false);
      onFailure('Payment initialization failed');
    }
  };

  const verifyPayment = async (paymentResponse: unknown) => {
    try {
      // In a real application, this would be an API call to your backend
      // to verify the payment signature
      console.log('Payment response:', paymentResponse);
      
      // Simulate successful verification
      setTimeout(() => {
        setIsLoading(false);
        clearCart(); // Clear cart after successful payment
        onSuccess(paymentResponse);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      onFailure('Payment verification failed');
    }
  };

  return (
    <div className="razorpay-checkout">
      <Button 
        onClick={handlePayment} 
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {isLoading ? 'Processing...' : `Pay ₹${orderDetails.amount}`}
      </Button>
    </div>
  );
};