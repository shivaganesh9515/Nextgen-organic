import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parentCategory?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: String,
  image: String,
  icon: String,
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

export default mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);