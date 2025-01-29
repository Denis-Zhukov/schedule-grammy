import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return <div>{JSON.stringify(session, null, 2)}</div>;
};

export default Home;
