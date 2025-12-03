import { create } from "zustand";

interface SheetStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Store global para gestionar el estado del Sheet de productos
 * Usado para abrir/cerrar el panel lateral desde cualquier componente
 */
export const useSheetStore = create<SheetStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

