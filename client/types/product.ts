export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  discountedPrice: number;
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

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  helpful: number;
  createdAt: Date;
}