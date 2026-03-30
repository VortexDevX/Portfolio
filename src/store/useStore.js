import { create } from "zustand";

export const useStore = create((set) => ({
  hoveredMonolithId: null,
  setHoveredMonolithId: (id) => set({ hoveredMonolithId: id }),

  activeMonolithId: null,
  setActiveMonolithId: (id) => set({ activeMonolithId: id }),
}));
