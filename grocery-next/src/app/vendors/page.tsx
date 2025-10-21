'use client';

import { useState, useEffect } from 'react';
import { vendors } from '../../lib/data/vendors';
import { Vendor } from '../../lib/types';

interface FilterOptions {
  categories: string[];
  rating: number | null;
}

import { VendorGrid } from '../../components/vendors/VendorGrid';
import { VendorFilters } from '../../components/vendors/VendorFilters';
import { SearchBar } from '../../components/common/SearchBar';
import { Pagination } from '../../components/common/Pagination';

export default function VendorsPage() {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const vendorsPerPage = 12;

  useEffect(() => {
    let result = [...vendors];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(vendor => 
        vendor.name.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredVendors(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  const startIndex = (currentPage - 1) * vendorsPerPage;
  const paginatedVendors = filteredVendors.slice(startIndex, startIndex + vendorsPerPage);

  const handleFilterChange = (filters: FilterOptions) => {
    // In a real app, this would filter the vendors based on the filters
    console.log('Filters changed:', filters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Vendors</h1>
        <SearchBar onSearch={setSearchQuery} placeholder="Search vendors..." />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <VendorFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Vendors Grid */}
        <div className="lg:w-3/4">
          {filteredVendors.length > 0 ? (
            <>
              <VendorGrid vendors={paginatedVendors} />
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
              <h3 className="text-lg font-medium text-gray-900">No vendors found</h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}