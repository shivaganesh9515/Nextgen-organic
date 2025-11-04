import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  total: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  finalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
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

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: Number,
  discountAmount: {
    type: Number,
    default: 0,
  },
  taxAmount: Number,
  finalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  trackingNumber: String,
  estimatedDelivery: Date,
  refundStatus: {
    type: String,
    enum: ['none', 'requested', 'approved', 'rejected', 'completed'],
    default: 'none',
  },
  refundReason: String,
}, {
  timestamps: true
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);