import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextProps } from '../interfaces/interfaces';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const validEmail = 'prologin@prologin.com';
const validPassword = 'ProLogin123456';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const login = (email: string, password: string): void => {
    if (email === validEmail && password === validPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      setIsAuthenticated(false);
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
