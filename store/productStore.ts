import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface ProductState {
  products: Product[];
  favorites: string[]; // Array of product IDs
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearProducts: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      favorites: [],
      addProduct: (product) => 
        set((state) => ({
          products: [...state.products, product],
        })),
      removeProduct: (productId) => 
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        })),
      updateProduct: (product) => 
        set((state) => ({
          products: state.products.map((p) => 
            p.id === product.id ? product : p
          ),
        })),
      setProducts: (products) => set({ products }),
      toggleFavorite: (productId) => 
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),
      isFavorite: (productId) => get().favorites.includes(productId),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: 'product-storage',
    }
  )
);