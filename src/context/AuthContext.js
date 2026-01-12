"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = api.getAuthToken();
    if (token) {
      // In a real app, you'd verify the token with the backend
      // For now, assume a token means logged in
      setUser({ email: "user@example.com" }); // Dummy user
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    if (data.access_token) {
      api.setAuthToken(data.access_token);
      setUser({ email });
      return true;
    }
    return false;
  };

  const register = async (email, password) => {
    const data = await api.register(email, password);
    if (data.access_token) {
      api.setAuthToken(data.access_token);
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    api.removeAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
