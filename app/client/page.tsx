'use client';
import { useSession } from 'next-auth/react';

const Home = () => {
  const session = useSession();

  return <div>{JSON.stringify(session, null, 2)}</div>;
};

export default Home;
