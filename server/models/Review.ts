import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  comment?: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  title: String,
  comment: String,
  images: [String],
  helpful: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);