import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';

interface AuthStore {
  token: string;
  isAuthenticated: boolean;
  setToken: (token: string) => void,
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  reset: () => void
};

const useAuthStore = create(persist<AuthStore>(
  (set) => ({
    token: '',
    isAuthenticated: false,
    setToken: (token: string) => set(
      produce((state: AuthStore) => {
        state.token = token;
      })
    ),
    setIsAuthenticated: (isAuthenticated: boolean) => set(
      produce((state: AuthStore) => {
        state.isAuthenticated = isAuthenticated;
      })
    ),
    reset: () => set(
      produce((state: AuthStore) => {
        state.token = '';
        state.isAuthenticated = false;
        sessionStorage.removeItem('auth_store');
      })
    )
  }),
  {
    name: 'auth_store',
    storage: createJSONStorage(() => sessionStorage)
  }
));

export type { AuthStore };
export default useAuthStore;