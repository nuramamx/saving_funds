import React from 'react';
import { useAuth } from './auth-context';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    window.location.href = '/savingfund/login';
  }

  return (
    <div>
      <div className="blocking-div" style={{ display: `${isAuthenticated ? 'none' : 'block' } `}}></div>
      {children}
    </div>
  );
};