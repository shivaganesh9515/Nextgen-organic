import mongoose, { Document, Schema } from 'mongoose';

export interface IRefund extends Document {
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  amount: number;
  reason: string;
  status: 'requested' | 'approved' | 'rejected' | 'completed';
  refundMethod: 'original' | 'wallet';
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const refundSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['requested', 'approved', 'rejected', 'completed'],
    default: 'requested',
  },
  refundMethod: {
    type: String,
    enum: ['original', 'wallet'],
    default: 'original',
  },
  processedAt: Date,
}, {
  timestamps: true
});

export default mongoose.models.Refund || mongoose.model<IRefund>('Refund', refundSchema);