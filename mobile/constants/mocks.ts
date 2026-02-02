export interface Vendor {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: string;
  tags: string[];
  banner: string;
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  isOrganic?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

// =====================================================================
// CATEGORIES
// =====================================================================
export const CATEGORIES: Category[] = [];

// =====================================================================
// VENDORS (Contextualized)
// =====================================================================
export const VENDORS: Vendor[] = [];

// =====================================================================
// PRODUCTS (Curated & Reliable)
// =====================================================================
export const PRODUCTS: Product[] = [];
