export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: string;
  subcategory: string;
  vendor: Vendor;
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  inStock: boolean;
  quantity: number;
  unit: string;
  weight?: string;
  tags: string[];
  isOrganic?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  nutritionInfo?: NutritionInfo;
  ingredients?: string[];
  certifications?: string[];
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  categories: string[];
  isActive: boolean;
  address: string;
  phone: string;
  email: string;
  openingHours?: OpeningHours;
  features?: string[];
}

export interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  address: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryAddress: Address;
  deliverySlot: DeliverySlot;
  orderDate: Date;
  deliveryDate?: Date;
  trackingNumber?: string;
  notes?: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled';

export type PaymentMethod = 
  | 'card' 
  | 'upi' 
  | 'netbanking' 
  | 'cod' 
  | 'wallet';

export type PaymentStatus = 
  | 'pending' 
  | 'paid' 
  | 'failed' 
  | 'refunded';

export interface DeliverySlot {
  id: string;
  date: string;
  time: string;
  fee: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  images?: string[];
  helpful: number;
  verified: boolean;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  minOrder: number;
  maxDiscount?: number;
  validUntil: Date;
  usageLimit: number;
  usedCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'offer' | 'system';
  date: Date;
  read: boolean;
  link?: string;
}