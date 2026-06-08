import { create } from 'zustand';
import { ActivityFilters } from '@/types';

interface UIState {
  viewMode: 'grid' | 'list' | 'map';
  filters: ActivityFilters;
  loadingStates: Record<string, boolean>;
  setViewMode: (mode: 'grid' | 'list' | 'map') => void;
  setFilters: (filters: ActivityFilters) => void;
  setLoading: (key: string, value: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  viewMode: 'grid',
  filters: {},
  loadingStates: {},
  setViewMode: (mode) => set({ viewMode: mode }),
  setFilters: (filters) => set({ filters }),
  setLoading: (key, value) => set((state) => ({
    loadingStates: { ...state.loadingStates, [key]: value },
  })),
}));