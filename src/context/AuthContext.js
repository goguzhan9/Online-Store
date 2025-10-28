import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(undefined);
const AUTH_TOKEN_KEY = "my-store-token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }
    try {
      return window.localStorage.getItem(AUTH_TOKEN_KEY) ?? "";
    } catch (error) {
      console.warn("LocalStorage erişim hatası", error);
      return "";
    }
  });

  const isAuthenticated = Boolean(token);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated,
      login: (newToken) => {
        try {
          window.localStorage.setItem(AUTH_TOKEN_KEY, newToken);
        } catch (error) {
          console.warn("Token kaydedilemedi", error);
        }
        setToken(newToken);
      },
      logout: () => {
        try {
          window.localStorage.removeItem(AUTH_TOKEN_KEY);
        } catch (error) {
          console.warn("Token silinemedi", error);
        }
        setToken("");
      },
    }),
    [isAuthenticated, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
