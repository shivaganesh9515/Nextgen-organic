import mongoose, { Document, Schema } from 'mongoose';

export interface IVendor extends Document {
  userId: mongoose.Types.ObjectId;
  storeName: string;
  storeDescription?: string;
  storeImage?: string;
  storeBanner?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  approvedAt?: Date;
  categories?: string[];
  businessRegistration?: string;
  taxId?: string;
  bankAccount?: {
    accountHolder: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  commission: number;
  rating: number;
  reviewCount: number;
  totalOrders: number;
  totalSales: number;
  availableBalance: number;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const vendorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  storeName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  storeDescription: String,
  storeImage: String,
  storeBanner: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  rejectionReason: String,
  approvedAt: Date,
  categories: [String],
  businessRegistration: String,
  taxId: String,
  bankAccount: {
    accountHolder: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
  },
  commission: {
    type: Number,
    default: 10, // percentage
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  availableBalance: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

export default mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', vendorSchema);