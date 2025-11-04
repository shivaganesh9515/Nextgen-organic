import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema({
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
      vendorId: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
}, {
  timestamps: true
});

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', cartSchema);