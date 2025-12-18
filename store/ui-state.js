import { create } from "zustand";


export const useUiStore = create((set, get) => ({
  // ===== STATE =====
    loadingScreen: false,
  

  // ===== ACTIONS =====
    setLoadingScreen: (value) => set({loadingScreen: value})
}))