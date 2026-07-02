import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { getToken, setToken } from "../services/api";

const AuthContext = createContext(null);

function toAppUser(dados) {
  return {
    id: dados.id,
    username: dados.username,
    name: dados.username,
    email: dados.email,
    numero_telefone: dados.numero_telefone,
    role: dados.admin ? "admin" : "user",
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao carregar a app, se já existir um token guardado, tenta restaurar a sessão.
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    authService
      .getUserById(payload.id)
      .then((dados) => setUser(toAppUser(dados)))
      .catch(() => setToken(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const payload = await authService.login(email, password);
    const dados = await authService.getUserById(payload.id);
    setUser(toAppUser(dados));
  };

  const register = async (username, email, password, numero_telefone) => {
    await authService.register(username, email, password, numero_telefone);
    await login(email, password);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateProfile = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
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
