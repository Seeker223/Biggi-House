import { createContext, useContext, useEffect, useState } from "react";
import {
  clearAuthToken,
  clearStoredHouses,
  clearStoredUser,
  getAuthToken,
  getStoredUser,
  setRefreshToken,
  clearRefreshToken,
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
        if (data?.refreshToken) {
          setRefreshToken(data.refreshToken);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (data, token, refreshToken) => {
    localStorage.setItem("biggiUser", JSON.stringify(data));
    if (token) setAuthToken(token);
    if (refreshToken) setRefreshToken(refreshToken);
    setUser(data);

    if (token) {
      getMe(token)
        .then((response) => {
          if (response?.user) {
            localStorage.setItem("biggiUser", JSON.stringify(response.user));
            setUser(response.user);
          }
          if (response?.refreshToken) {
            setRefreshToken(response.refreshToken);
          }
        })
        .catch(() => {
          // Keep the initial auth payload if the richer profile fetch fails.
        });
    }
  };

  const logout = () => {
    clearStoredUser();
    clearAuthToken();
    clearRefreshToken();
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
