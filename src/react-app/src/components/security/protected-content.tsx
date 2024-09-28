import React from 'react';
import { useAuth } from './auth-context';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    window.location.href = '/login';
  }

  return <>{children}</>;
};