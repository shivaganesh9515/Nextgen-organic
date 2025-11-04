// App Constants
export const APP_NAME = 'DailyPick';
export const APP_DESCRIPTION = 'Fresh Groceries Delivered';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Roles
export const ROLES = {
  USER: 'user',
  VENDOR: 'vendor',
  ADMIN: 'admin',
} as const;

// Order Statuses
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

// Payment Statuses
export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// Product Statuses
export const PRODUCT_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Vendor Statuses
export const VENDOR_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

// Refund Statuses
export const REFUND_STATUSES = {
  NONE: 'none',
  REQUESTED: 'requested',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
} as const;

// Image Upload
export const IMAGE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
} as const;