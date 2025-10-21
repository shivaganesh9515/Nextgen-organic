'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { products } from '../../lib/data/products';
import { vendors } from '../../lib/data/vendors';
import { Product } from '../../lib/types';
import { ProductGrid } from '../../components/shop/ProductGrid';
import { ProductFilters } from '../../components/shop/ProductFilters';
import { SearchBar } from '../../components/common/SearchBar';
import { Pagination } from '../../components/common/Pagination';
import { SortingDropdown } from '../../components/shop/SortingDropdown';
import { OfferZone } from '../../components/shop/OfferZone';
import { SectionHeader } from '../../components/ui/SectionHeader';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
  vendors: string[];
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    rating: null,
    vendors: []
  });
  const productsPerPage = 12;

  useEffect(() => {
    let result = [...products];
    
    // Filter by category from URL
    if (category) {
      result = result.filter(product => product.category === category);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply filters
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    if (filters.vendors.length > 0) {
      result = result.filter(product => 
        filters.vendors.includes(product.vendor.id)
      );
    }
    
    if (filters.rating !== null) {
      result = result.filter(product => 
        product.rating >= filters.rating!
      );
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    // Apply sorting
    switch (sortBy) {
      case 'priceLowHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => 
          new Date(b.id).getTime() - new Date(a.id).getTime()
        );
        break;
      case 'bestSelling':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Featured - no sorting
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [category, searchQuery, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader 
          title={category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
          subtitle="Discover the best products from our trusted vendors"
        />
        
        <SearchBar onSearch={setSearchQuery} placeholder="Search products..." />
        
        <OfferZone />
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters 
              onFilterChange={handleFilterChange} 
              vendors={vendors.map(v => ({ id: v.id, name: v.name }))}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sorting and Results Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-sm text-gray-500">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </div>
              <SortingDropdown onSortChange={handleSortChange} currentSort={sortBy} />
            </div>
            
            {filteredProducts.length > 0 ? (
              <>
                <ProductGrid products={paginatedProducts} />
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}