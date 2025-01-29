'use client';

import { useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState, Suspense } from 'react';
import styles from './style.module.css';
import { config } from '@/config';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
};

const SignInContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const { status } = useSession();

  useEffect(() => {
    if (token) {
      signIn('telegram', { token, callbackUrl: '/', redirect: true })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Авторизация</h1>
        <p className={styles.message}>
          {(loading || status === 'loading') && 'Подтверждаем данные...'}
          {status === 'authenticated' && 'Вы успешно вошли'}
          {status === 'unauthenticated' &&
            'Необходимо перейти по ссылке из бота'}
        </p>
        {status === 'unauthenticated' && (
          <Link
            className={styles.buttonLink}
            href={`https://t.me/${config.USERNAME_BOT}`}
            rel="noreferrer nofollow noopener"
            target="_blank"
            passHref
          >
            Перейти в Telegram
          </Link>
        )}
        {status === 'authenticated' && (
          <Link className={styles.buttonLink} href="/">
            На главную страницу
          </Link>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
