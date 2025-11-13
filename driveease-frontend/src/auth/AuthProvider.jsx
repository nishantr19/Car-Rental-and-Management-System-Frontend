import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("token");
    return t ? { token: t } : null;
  });

  useEffect(() => {
    // optional: verify token or fetch profile
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    setUser({ token });
    return token;
  };

  const register = async (username, password, email) => {
    return api.post("/auth/register", { username, password, email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}