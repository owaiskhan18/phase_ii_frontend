"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (type === 'login') {
        await login(email, password);
      } else if (type === 'register') {
        await register(email, password);
      }
      router.push('/'); // redirect to home on success
    } catch (err) {
      // show backend error message
      setError(err.message || `Failed to ${type}. Please check your credentials.`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '300px',
        margin: '2rem auto',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px'
      }}
    >
      <h2>{type === 'login' ? 'Login' : 'Register'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: '0.5rem', borderRadius: '3px', border: '1px solid #ddd' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: '0.5rem', borderRadius: '3px', border: '1px solid #ddd' }}
      />
      <button
        type="submit"
        style={{
          padding: '0.75rem',
          borderRadius: '3px',
          border: 'none',
          background: '#007bff',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
