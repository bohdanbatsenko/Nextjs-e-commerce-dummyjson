'use client';
// import { signIn } from 'next-auth/react';
// import { login } from '@/hooks/generateCustomerToken';
import { useLogin } from '@/hooks/useLogin';
import { useState } from 'react';

export default function SignIn() {
    const { login, loading, loginError, loginSuccess } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  
  console.log('sign-in page init')

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //     const result = await login(email, password);
  //   if (!result.success) {
  //     setError(result.message);
  //   } else {

  //     window.location.href = '/';
  //   }
  // };

  return (
    <div className='px-10 lg:px-20 py-5'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        {loginSuccess && <p style={{ color: 'green' }}>Login successful!</p>}
        {
          !loginSuccess && <button type="submit">Sign In</button>
        }
        
      </form>
    </div>
  );
}