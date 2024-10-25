import React, { createContext, useContext, useState, useEffect } from 'react';
import useAuthStore from '../../core/stores/auth-store';
import UserDataByUserAndPasswordSpec from '../../core/interfaces/specs/base/user-data-by-user-and-password-spec';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: UserDataByUserAndPasswordSpec) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, setToken, setIsAuthenticated, reset, setUser } = useAuthStore();

  const login = (user: UserDataByUserAndPasswordSpec) => {
    setUser(user);
    setToken(user.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    reset();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
