import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
  // Category filters
  selectedCategories: string[];
  // Price range
  priceRange: [number, number];
  // Sort options
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  // Search query
  searchQuery: string;
  // Availability
  inStockOnly: boolean;
  // Rating filter
  minRating: number;
  
  // Actions
  toggleCategory: (category: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setSearchQuery: (query: string) => void;
  setInStockOnly: (inStock: boolean) => void;
  setMinRating: (rating: number) => void;
  resetFilters: () => void;
  clearAllCategories: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, _get) => ({
      // _get is passed but not used in this function
      // This is intentional as we're not using it in the current implementation
      selectedCategories: [],
      priceRange: [0, 1000],
      sortBy: 'name',
      sortOrder: 'asc',
      searchQuery: '',
      inStockOnly: false,
      minRating: 0,
      
      toggleCategory: (category) => 
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),
      
      setPriceRange: (min, max) => set({ priceRange: [min, max] }),
      
      setSortBy: (sortBy) => set({ sortBy }),
      
      setSortOrder: (sortOrder) => set({ sortOrder }),
      
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      
      setInStockOnly: (inStockOnly) => set({ inStockOnly }),
      
      setMinRating: (minRating) => set({ minRating }),
      
      resetFilters: () => 
        set({
          selectedCategories: [],
          priceRange: [0, 1000],
          sortBy: 'name',
          sortOrder: 'asc',
          searchQuery: '',
          inStockOnly: false,
          minRating: 0,
        }),
      
      clearAllCategories: () => set({ selectedCategories: [] }),
    }),
    {
      name: 'filter-storage',
    }
  )
);