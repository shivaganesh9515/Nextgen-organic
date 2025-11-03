import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

interface UseProductsOptions {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(options.page || 1);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock data for now
      const mockProducts: Product[] = [
        {
          id: '1',
          vendorId: '1',
          name: 'Organic Apples',
          description: 'Fresh organic apples from local farms',
          price: 2.99,
          discount: 0,
          discountedPrice: 2.99,
          category: 'Fruits',
          images: ['/placeholder.jpg'],
          stock: 50,
          sku: 'FRU-001',
          status: 'approved',
          rating: 4.5,
          reviewCount: 12,
          sales: 45,
          tags: ['organic', 'fresh'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          vendorId: '2',
          name: 'Whole Wheat Bread',
          description: 'Freshly baked whole wheat bread',
          price: 3.49,
          discount: 0.5,
          discountedPrice: 2.99,
          category: 'Bakery',
          images: ['/placeholder.jpg'],
          stock: 30,
          sku: 'BAK-002',
          status: 'approved',
          rating: 4.2,
          reviewCount: 8,
          sales: 28,
          tags: ['fresh', 'healthy'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      
      setProducts(mockProducts);
      setTotal(mockProducts.length);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [options.category, options.search, page, options.limit, options.sortBy, options.sortOrder]);

  const refetch = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    total,
    page,
    setPage,
    refetch,
  };
}