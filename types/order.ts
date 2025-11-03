import { UserAddress } from './user';

export interface OrderItem {
  id: string;
  productId: string;
  vendorId: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  finalAmount: number;
  shippingAddress: UserAddress;
  paymentMethod: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'wallet';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  estimatedDelivery?: Date;
  refundStatus: 'none' | 'requested' | 'approved' | 'rejected' | 'completed';
  refundReason?: string;
  createdAt: Date;
  updatedAt: Date;
}