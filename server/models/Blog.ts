import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author: mongoose.Types.ObjectId;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: String,
  featuredImage: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  categories: [String],
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', blogSchema);