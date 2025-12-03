import { create } from 'zustand';

import { Product } from '@/types/product';

interface ProductState {
  selectedProduct: Product | null;
  isSheetOpen: boolean;
  openSheet: (product: Product) => void;
  closeSheet: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  selectedProduct: null,
  isSheetOpen: false,
  openSheet: (product) => set({ selectedProduct: product, isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false, selectedProduct: null }),
}));

