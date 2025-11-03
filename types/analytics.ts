export interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalVendors: number;
  salesData: {
    date: string;
    amount: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
  }[];
  topVendors: {
    id: string;
    name: string;
    sales: number;
  }[];
}

export interface VendorAnalytics {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  salesData: {
    date: string;
    amount: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
  }[];
}

export interface UserAnalytics {
  totalSpent: number;
  totalOrders: number;
  favoriteCategories: string[];
  orderHistory: {
    date: string;
    amount: number;
    status: string;
  }[];
}