import mongoose, { Document, Schema } from 'mongoose';

export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    addedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, {
  timestamps: true
});

export default mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', wishlistSchema);