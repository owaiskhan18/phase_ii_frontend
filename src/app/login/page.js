"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const LoginPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <AuthForm type="login" />
      <p style={{ marginTop: '1rem' }}>
        Don't have an account?{' '}
        <Link href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
