import { createContext, useContext, useEffect, useState } from "react";
import { clearStoredHouses, clearStoredUser, getStoredUser } from "./auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());

  useEffect(() => {
    const handleStorage = () => setUser(getStoredUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = (data) => {
    localStorage.setItem("biggiUser", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    clearStoredUser();
    clearStoredHouses();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
