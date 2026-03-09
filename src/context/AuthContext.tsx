// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import { setAccessToken } from "../api/axios";

interface AuthContextType {
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);

  const login = (token: string, role: string) => {
    setAccessToken(token);
    setRole(role);
  };

  const logout = () => {
    setAccessToken(null);
    setRole(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};