import { createContext, useContext, useState } from "react";

// Contexto de autenticação MUITO simples, só para o frontend funcionar
// de forma isolada. Quando o backend (Node + Express + JWT) estiver pronto,
// as funções login/register abaixo devem ser substituídas por chamadas
// axios à API (ex: POST /api/auth/login).

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = não autenticado

  // Login simulado: aceita qualquer email/password.
  // Se o email contiver "admin", o utilizador fica com o papel de admin,
  // só para ser possível testar o AdminDashboard sem backend.
  const login = (email, password) => {
    const role = email.toLowerCase().includes("admin") ? "admin" : "user";
    const name = email.split("@")[0];
    setUser({ name, email, role });
  };

  const register = (name, email, password) => {
    setUser({ name, email, role: "user" });
  };

  const logout = () => setUser(null);

  const updateProfile = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook de conveniência: import { useAuth } from "../context/AuthContext"
export function useAuth() {
  return useContext(AuthContext);
}
