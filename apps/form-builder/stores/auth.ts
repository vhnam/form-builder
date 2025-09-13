import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { User } from '@/types/user';

interface AuthStorage {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (user: User, token: string, refreshToken: string) => void;
  setTokens: (token: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}

const initialState: AuthStorage = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStorage & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      setAuth: (user, token, refreshToken) => {
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        });
      },
      clearAuth: () => {
        set({ ...initialState });
      },
      setTokens: (token, refreshToken) => {
        set({
          token,
          refreshToken,
        });
      },
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (
          state &&
          state.isAuthenticated &&
          (!state.token || !state.refreshToken)
        ) {
          console.log(
            'Inconsistent auth state detected during rehydration, clearing auth'
          );
          state.clearAuth();
        }
      },
    }
  )
);
