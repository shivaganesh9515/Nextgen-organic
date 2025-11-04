import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Vendor } from '@/types/vendor';

interface VendorState {
  vendors: Vendor[];
  favoriteVendors: string[]; // Array of vendor IDs
  addVendor: (vendor: Vendor) => void;
  removeVendor: (vendorId: string) => void;
  updateVendor: (vendor: Vendor) => void;
  setVendors: (vendors: Vendor[]) => void;
  toggleFavoriteVendor: (vendorId: string) => void;
  isFavoriteVendor: (vendorId: string) => boolean;
  clearVendors: () => void;
  getVendorById: (vendorId: string) => Vendor | undefined;
}

export const useVendorStore = create<VendorState>()(
  persist(
    (set, get) => ({
      vendors: [],
      favoriteVendors: [],
      addVendor: (vendor) => 
        set((state) => ({
          vendors: [...state.vendors, vendor],
        })),
      removeVendor: (vendorId) => 
        set((state) => ({
          vendors: state.vendors.filter((v) => v.id !== vendorId),
        })),
      updateVendor: (vendor) => 
        set((state) => ({
          vendors: state.vendors.map((v) => 
            v.id === vendor.id ? vendor : v
          ),
        })),
      setVendors: (vendors) => set({ vendors }),
      toggleFavoriteVendor: (vendorId) => 
        set((state) => ({
          favoriteVendors: state.favoriteVendors.includes(vendorId)
            ? state.favoriteVendors.filter((id) => id !== vendorId)
            : [...state.favoriteVendors, vendorId],
        })),
      isFavoriteVendor: (vendorId) => get().favoriteVendors.includes(vendorId),
      clearVendors: () => set({ vendors: [] }),
      getVendorById: (vendorId) => 
        get().vendors.find((vendor) => vendor.id === vendorId),
    }),
    {
      name: 'vendor-storage',
    }
  )
);