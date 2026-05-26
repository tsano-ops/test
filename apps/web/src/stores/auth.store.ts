import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { usePermissionsStore } from './permissions.store';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  maritalStatus?: string | null;
  nationality?: string | null;
  countryOfResidence?: string | null;
  stateRegion?: string | null;
}

export interface User {
  id: string;
  email: string;
  planType: string;
  accountType?: string;
  role?: string;
  onboardingCompleted: boolean;
  profile?: UserProfile | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  pendingEmail: string | null; // for verification flow

  // Actions
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  setPendingEmail: (email: string) => void;
  loginSuccess: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      pendingEmail: null,

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken, isAuthenticated: true }),

      setUser: (user) => {
        set({ user });
        // Sync permissions store with user role
        const role = user?.accountType === 'PLAN_OWNER' ? 'PLAN_OWNER' : 'VIEWER';
        usePermissionsStore.getState().setRole(role);
      },

      setPendingEmail: (email) => set({ pendingEmail: email }),

      loginSuccess: (user, accessToken, refreshToken) => {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          pendingEmail: null,
        });
        // Sync permissions store with user role
        const role = user?.accountType === 'PLAN_OWNER' ? 'PLAN_OWNER' : 'VIEWER';
        usePermissionsStore.getState().setRole(role);
      },

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          pendingEmail: null,
        }),
    }),
    {
      name: 'planafter-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pendingEmail: state.pendingEmail,
      }),
    },
  ),
);
