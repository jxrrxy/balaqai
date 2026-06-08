import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Parent, Category } from '@/types';

interface AuthState {
  user: Parent | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (data: { 
    name: string; 
    email: string; 
    phone: string; 
    password: string;
    child: Omit<Parent['children'][0], 'id'> & { birthDate: string };
  }) => Promise<void>;
  updateUser: (user: Parent) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async ({ email, password }) => {
        set({ isLoading: true });
        const user = await api.auth.login({ email, password });
        set({ user, isAuthenticated: true, isLoading: false });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('balaqai-storage');
      },
      register: async (data) => {
        set({ isLoading: true });
        const user = await api.auth.register(data);
        set({ user, isAuthenticated: true, isLoading: false });
      },
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'balaqai-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// Mock API
const api = {
  auth: {
    login: async ({ email }: { email: string; password: string }) => {
      await new Promise((r) => setTimeout(r, 500));
      return {
        id: 'parent-1',
        name: 'Айгерим Нұрғалина',
        email,
        phone: '+7 (777) 123-45-67',
        avatar: 'https://placehold.co/100x100',
        children: [
          {
            id: 'child-1',
            name: 'Данияр',
            birthDate: '2018-05-15',
            interests: ['sports', 'it'],
            currentActivities: [],
          },
        ],
        subscription: {
          id: 'sub-1',
          type: '12',
          visitsRemaining: 12,
          expiresAt: '2026-12-31',
          isActive: true,
        },
        favorites: [],
      } as Parent;
    },
    register: async (data: Record<string, unknown>) => {
      await new Promise((r) => setTimeout(r, 800));
      return {
        id: `parent-${Date.now()}`,
        name: data.name as string,
        email: data.email as string,
        phone: data.phone as string,
        avatar: 'https://placehold.co/100x100',
        children: [
          {
            id: `child-${Date.now()}`,
            name: (data.child as Record<string, unknown>).name as string,
            birthDate: (data.child as Record<string, unknown>).birthDate as string,
            interests: (data.child as Record<string, unknown>).interests as Category[],
            currentActivities: [],
          },
        ],
        subscription: null,
        favorites: [],
      } as unknown as Parent;
    },
  },
};