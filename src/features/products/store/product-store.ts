import { create } from 'zustand';

import { Database } from '@/types/database.types';

// Usamos el tipo directo de la DB (ajusta según tu generación de tipos real)
type Product = Database['public']['Tables']['products']['Row'];

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

