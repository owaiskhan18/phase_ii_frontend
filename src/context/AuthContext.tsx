"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser } from "../services/api"; // Will be created/refined later

interface AuthContextType {
  user: { email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean; // Add loading state
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedToken && storedUserEmail) {
      setToken(storedToken);
      setUser({ email: storedUserEmail });
      setIsAuthenticated(true);
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      const newToken = response.access_token;
      setToken(newToken);
      setUser({ email });
      setIsAuthenticated(true);
      localStorage.setItem("token", newToken);
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      logout(); // Ensure state is clean on failed login
      throw error; // Re-throw to be caught by AuthForm
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await registerUser(email, password);
      // For registration, we might directly log them in or redirect to login page
      // Here, we'll just log the success and let the AuthForm redirect to login
      console.log("Registration successful:", response);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Re-throw to be caught by AuthForm
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
