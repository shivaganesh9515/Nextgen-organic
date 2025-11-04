import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  vendorId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  discount: number;
  discountedPrice?: number;
  category: string;
  images: string[];
  stock: number;
  sku?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  approvedAt?: Date;
  rating: number;
  reviewCount: number;
  sales: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  discountedPrice: Number,
  category: {
    type: String,
    required: true,
  },
  images: [String],
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  sku: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  rejectionReason: String,
  approvedAt: Date,
  rating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  sales: {
    type: Number,
    default: 0,
  },
  tags: [String],
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);