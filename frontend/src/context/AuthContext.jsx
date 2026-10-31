import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(() => {
    try {
      const saved = localStorage.getItem('zuccano_employee_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    const session = {
      id: userData.id || 'ZUC-2026-08',
      name: userData.name || 'Pavan Reddy',
      email: userData.email,
      role: userData.role || 'Executive / Core Engineering',
      department: userData.department || 'Product & Technology',
      avatar: userData.avatar || '/team-ayaan.jpg',
      loginTime: new Date().toISOString(),
    };
    setEmployee(session);
    try {
      localStorage.setItem('zuccano_employee_session', JSON.stringify(session));
    } catch {
      // ignore
    }
    return session;
  };

  const logout = () => {
    setEmployee(null);
    try {
      localStorage.removeItem('zuccano_employee_session');
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ employee, isAuthenticated: !!employee, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
