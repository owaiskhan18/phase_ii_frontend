"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
// import type { Metadata } from "next"; // Metadata should be exported from a non-client component
import "./globals.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar"; // Import Navbar component

// const metadata: Metadata = { // Metadata should be exported from a non-client component
//   title: "Todo App",
//   description: "A simple todo application",
// };

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth(); // Use isAuthenticated from context
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect unauthenticated users from protected routes
    if (!loading && !isAuthenticated && pathname !== '/login' && pathname !== '/register' && pathname !== '/') {
      router.push('/login');
    }
    // Redirect authenticated users from auth pages to dashboard
    if (!loading && isAuthenticated && (pathname === '/login' || pathname === '/register')) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-xl">Loading application...</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>TaskMaster</title>
        <meta name="description" content="Organize, track, and complete your tasks effortlessly." />
      </head>
      <body>
        <AuthProvider>
          <Navbar /> {/* Render Navbar here */}
          <AuthWrapper>{children}</AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
