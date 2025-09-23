'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}