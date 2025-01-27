'use client';

import dynamic from 'next/dynamic';

import styles from './style.module.css';

import { Loader } from '@/components/loader';

const LoginButton = dynamic(
  async () => (await import('@/components/login-button')).LoginButton,
  {
    ssr: false,
    loading: () => <Loader />,
  },
);

const signInPage = () => {
  return (
    <div className={styles.wrapper}>
      <LoginButton />
    </div>
  );
};

export default signInPage;
