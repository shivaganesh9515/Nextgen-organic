import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types/product';

// Mock data for products
const mockProducts: Product[] = [
  {
    id: '1',
    vendorId: 'vendor1',
    name: 'Organic Apples',
    description: 'Fresh organic apples from local farms',
    price: 2.99,
    discount: 0,
    discountedPrice: 2.99,
    category: 'Fruits',
    images: ['/placeholder.svg'],
    stock: 50,
    status: 'approved',
    rating: 4.8,
    reviewCount: 24,
    sales: 120,
    tags: ['organic', 'fruit', 'healthy'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    vendorId: 'vendor2',
    name: 'Whole Grain Bread',
    description: 'Freshly baked whole grain bread',
    price: 3.49,
    discount: 0,
    discountedPrice: 3.49,
    category: 'Bakery',
    images: ['/placeholder.svg'],
    stock: 30,
    status: 'approved',
    rating: 4.6,
    reviewCount: 18,
    sales: 85,
    tags: ['bread', 'whole grain', 'bakery'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    vendorId: 'vendor1',
    name: 'Free Range Eggs',
    description: 'Farm fresh free range eggs',
    price: 4.99,
    discount: 0,
    discountedPrice: 4.99,
    category: 'Dairy',
    images: ['/placeholder.svg'],
    stock: 40,
    status: 'approved',
    rating: 4.9,
    reviewCount: 32,
    sales: 150,
    tags: ['eggs', 'dairy', 'farm fresh'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  
  let filteredProducts = mockProducts;
  
  if (category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (search) {
    filteredProducts = filteredProducts.filter(
      product => 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  return NextResponse.json({
    success: true,
    data: filteredProducts,
    count: filteredProducts.length,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // In a real app, you would save this to a database
  const newProduct: Product = {
    id: `${mockProducts.length + 1}`,
    vendorId: body.vendorId,
    name: body.name,
    description: body.description,
    price: body.price,
    discount: body.discount || 0,
    discountedPrice: body.price - (body.price * (body.discount || 0) / 100),
    category: body.category,
    images: body.images || [],
    stock: body.stock || 0,
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    sales: 0,
    tags: body.tags || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // Add to mock data (in real app, save to database)
  mockProducts.push(newProduct);
  
  return NextResponse.json({
    success: true,
    data: newProduct,
  });
}