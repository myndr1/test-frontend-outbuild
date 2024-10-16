import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthContextProps } from "../interfaces/interfaces";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const login = async (email: string, password: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const validEmail = process.env.REACT_APP_VALID_EMAIL;
      const validPassword = process.env.REACT_APP_VALID_PASSWORD;
      console.log(validEmail, validPassword);
      if (email === validEmail && password === validPassword) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        resolve();
      } else {
        setIsAuthenticated(false);
        reject("Invalid credentials");
      }
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
