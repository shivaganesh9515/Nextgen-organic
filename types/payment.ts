export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank' | 'razorpay';
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  isDefault: boolean;
  createdAt: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  paymentMethod: PaymentMethod;
  clientSecret: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payout {
  id: string;
  vendorId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'paid' | 'failed';
  paymentMethod: string;
  transactionId: string;
  scheduledDate: string;
  paidDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Refund {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  reason: string;
  rejectionReason?: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}