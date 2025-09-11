import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setAuth: (user: User, token: string, refreshToken: string) => void;
  setTokens: (token: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
  checkAuthConsistency: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, token, refreshToken) => {
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        });
      },

      setTokens: (token, refreshToken) => {
        set({
          token,
          refreshToken,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
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

      checkAuthConsistency: () => {
        const state = get();
        const isConsistent =
          state.isAuthenticated &&
          Boolean(state.token) &&
          Boolean(state.refreshToken);

        if (!isConsistent && state.isAuthenticated) {
          console.log('Inconsistent auth state detected, clearing auth');
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          return false;
        }

        return isConsistent;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
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
