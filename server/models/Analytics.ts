import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  date: Date;
  type: 'admin' | 'vendor' | 'user';
  userId?: mongoose.Types.ObjectId;
  vendorId?: mongoose.Types.ObjectId;
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalVendors: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts?: string[];
  topVendors?: string[];
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

const analyticsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['admin', 'vendor', 'user'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
  },
  totalSales: Number,
  totalOrders: Number,
  totalUsers: Number,
  totalProducts: Number,
  totalVendors: Number,
  conversionRate: Number,
  averageOrderValue: Number,
  topProducts: [String],
  topVendors: [String],
  metadata: Schema.Types.Mixed,
}, {
  timestamps: true
});

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', analyticsSchema);