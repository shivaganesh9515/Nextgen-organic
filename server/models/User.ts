import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'vendor' | 'admin';
  phone?: string;
  profilePicture?: string;
  addresses?: Array<{
    label: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }>;
  paymentMethods?: Array<{
    type: string;
    cardToken?: string;
    isDefault: boolean;
  }>;
  totalSpent: number;
  ordersCount: number;
  isEmailVerified: boolean;
  isBlocked: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user',
  },
  phone: String,
  profilePicture: String,
  addresses: [
    {
      label: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      isDefault: Boolean,
    },
  ],
  paymentMethods: [
    {
      type: String,
      cardToken: String,
      isDefault: Boolean,
    },
  ],
  totalSpent: {
    type: Number,
    default: 0,
  },
  ordersCount: {
    type: Number,
    default: 0,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  lastLogin: Date,
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);