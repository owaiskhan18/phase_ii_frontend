"use client";

import React, { useState } from "react";
import AuthForm from "../../components/AuthForm"; // Adjust path as needed
import { useAuth } from "../../context/AuthContext"; 
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth(); 
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await login(email, password);
      // login function in AuthContext handles redirection
    } catch (error: any) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <AuthForm
        isRegister={false}
        onSubmit={handleLogin}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default LoginPage;
