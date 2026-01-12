"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AuthFormProps {
  isRegister: boolean;
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isRegister,
  onSubmit,
  isLoading,
  errorMessage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div
      className="bg-gray-800 p-8 rounded-xl shadow-custom-dark border border-gray-700 w-full max-w-md mx-auto"
    >
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        {isRegister ? "Create Account" : "Welcome Back!"}
      </h2>

      {errorMessage && (
        <div
          className="bg-red-500 text-white text-center p-3 rounded-md mb-4 text-sm"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            required
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-300 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-md text-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : isRegister ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-400">
        {isRegister ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary-400 hover:underline">
              Login
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link href="/register" className="text-primary-400 hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
