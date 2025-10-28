// Mock data for NextGen Organics application

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  vendorId: number;
}

export interface Vendor {
  id: number;
  name: string;
  location: string;
  rating: number;
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

// Sample data
export const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Organic Apples',
    price: 2.99,
    description: 'Crisp and delicious organic apples',
    category: 'Fruits',
    vendorId: 1,
  },
  {
    id: 2,
    name: 'Whole Grain Bread',
    price: 3.49,
    description: 'Freshly baked whole grain bread',
    category: 'Bakery',
    vendorId: 2,
  },
];

export const sampleVendors: Vendor[] = [
  {
    id: 1,
    name: 'Green Acres Farm',
    location: 'Farmville, FA',
    rating: 4.8,
    description: 'Local organic farm specializing in fruits and vegetables',
  },
  {
    id: 2,
    name: 'Healthy Bakery',
    location: 'Breadtown, BT',
    rating: 4.6,
    description: 'Artisan bakery with organic ingredients',
  },
];

export const currentUser: User = {
  id: 1,
  name: 'Shivaganesh Gajavelli',
  email: 'shivaganesh@example.com',
  address: '123 Developer Lane, Codeville',
};