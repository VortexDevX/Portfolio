import { create } from 'zustand';

export const useStore = create((set) => ({
  isBooted: false,
  setBooted: (status) => set({ isBooted: status }),

  hoveredMonolithId: null,
  setHoveredMonolithId: (id) => set({ hoveredMonolithId: id }),

  activeMonolithId: null,
  setActiveMonolithId: (id) => set({ activeMonolithId: id }),

  isTerminalOpen: false,
  setTerminalOpen: (status) => set({ isTerminalOpen: status }),
}));
