import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isSearchOpen: false,
  isCartOpen: false,
  isMenuOpen: false,
  
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  closeSearch: () => set({ isSearchOpen: false }),
  openSearch: () => set({ isSearchOpen: true }),
  
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCart: () => set({ isCartOpen: false }),
  openCart: () => set({ isCartOpen: true }),
  
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  openMenu: () => set({ isMenuOpen: true }),
}));
