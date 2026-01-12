"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
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
      <AuthForm type="register" />
    </div>
  );
};

export default RegisterPage;
