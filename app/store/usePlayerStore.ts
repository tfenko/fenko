// /store/usePlayerStore.ts
import { create } from 'zustand';

interface PlayerState {
  isOpen: boolean;
  openPlayer: () => void;
  closePlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isOpen: false,
  openPlayer: () => set({ isOpen: true }),
  closePlayer: () => set({ isOpen: false }),
}));
