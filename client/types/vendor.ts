export interface Vendor {
  id: string;
  userId: string;
  storeName: string;
  storeDescription?: string;
  storeImage?: string;
  storeBanner?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  approvedAt?: Date;
  categories: string[];
  businessRegistration?: string;
  taxId?: string;
  bankAccount?: {
    accountHolder: string;
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  commission: number;
  rating: number;
  reviewCount: number;
  totalOrders: number;
  totalSales: number;
  availableBalance: number;
  isVerified: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}