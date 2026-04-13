import { createContext, useContext, useEffect, useState } from "react";
import {
  clearAuthToken,
  clearStoredHouses,
  clearStoredUser,
  getAuthToken,
  getStoredUser,
  setAuthToken,
} from "./auth";
import { getMe } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStorage = () => setUser(getStoredUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLoading(false);
      return;
    }
    getMe(token)
      .then((data) => {
        if (data?.user) {
          localStorage.setItem("biggiUser", JSON.stringify(data.user));
          setUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (data, token) => {
    localStorage.setItem("biggiUser", JSON.stringify(data));
    if (token) setAuthToken(token);
    setUser(data);
  };

  const logout = () => {
    clearStoredUser();
    clearAuthToken();
    clearStoredHouses();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
