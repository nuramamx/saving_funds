import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { produce } from 'immer';
import UserDataByUserAndPasswordSpec from '../interfaces/specs/base/user-data-by-user-and-password-spec';

interface AuthStore {
  token: string;
  user: UserDataByUserAndPasswordSpec;
  isAuthenticated: boolean;
  setToken: (token: string) => void,
  setUser: (user: UserDataByUserAndPasswordSpec) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void,
  reset: () => void
};

const useAuthStore = create(persist<AuthStore>(
  (set) => ({
    token: '',
    user: undefined!,
    isAuthenticated: false,
    setToken: (token: string) => set(
      produce((state: AuthStore) => {
        state.token = token;
      })
    ),
    setUser: (user: UserDataByUserAndPasswordSpec) => set(
      produce((state: AuthStore) => {
        state.user = user;
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