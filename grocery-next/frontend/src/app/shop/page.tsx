'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { useStableLoading } from '../../hooks/useStableLoading';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
  vendors: string[];
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category');
  const urlSearchQuery = searchParams.get('search'); // Get search query from URL
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery || ''); // Initialize with URL search query
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    rating: null,
    vendors: []
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const productsPerPage = 12;

  useEffect(() => {
    // Update local search state when URL search parameter changes
    // Only update if the URL search query is different from current search query
    if (urlSearchQuery !== null && urlSearchQuery !== searchQuery) {
      setSearchQuery(urlSearchQuery);
    }
  }, [urlSearchQuery, searchQuery]);

  // Memoize filtered products to prevent unnecessary re-renders
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Filter by category from URL
    if (category) {
      result = result.filter(product => product.category === category);
    }
    
    // Filter by search query (from both URL and local state)
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
    
    return result;
  }, [category, searchQuery, filters, sortBy]);

  // Handle search query changes and update URL
  const handleSearch = (query: string) => {
    // Only update if the query has actually changed
    if (query === searchQuery) return;
    
    setSearchQuery(query);
    
    // Update URL with search parameter
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    
    // Preserve category parameter
    if (category) {
      params.set('category', category);
    }
    
    // Only push to router if params have changed
    const newUrl = `/shop?${params.toString()}`;
    const currentUrl = `/shop?${searchParams.toString()}`;
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleFilterChange = (newFilters: FilterOptions) => {
    // Only update if filters have actually changed
    if (JSON.stringify(newFilters) === JSON.stringify(filters)) return;
    
    setIsFiltering(true);
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    // Small delay to prevent flickering
    setTimeout(() => setIsFiltering(false), 50);
  };

  const handleSortChange = (newSortBy: string) => {
    // Only update if sort option has actually changed
    if (newSortBy === sortBy) return;
    
    setIsFiltering(true);
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to first page when sorting changes
    // Small delay to prevent flickering
    setTimeout(() => setIsFiltering(false), 50);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        layout
      >
        <SectionHeader 
          title={category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
          subtitle="Discover the best products from our trusted vendors"
        />
        
        <SearchBar onSearch={handleSearch} placeholder="Search products..." initialValue={searchQuery} />
        
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
                <ProductGrid products={paginatedProducts} loading={isFiltering} />
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