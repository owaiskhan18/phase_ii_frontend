"use client";

import React, { useState } from "react";
import AuthForm from "../../components/AuthForm"; // Adjust path as needed
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await register(email, password);
      console.log("Registration successful!");
      router.push("/login"); // Redirect to login on success
    } catch (error: any) {
      setErrorMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <AuthForm
        isRegister={true}
        onSubmit={handleRegister}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default RegisterPage;
