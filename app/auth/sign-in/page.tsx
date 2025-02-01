'use client';

import { useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState, Suspense } from 'react';
import styles from './style.module.css';
import { envConfig } from '@/env-config';
import Link from 'next/link';
import { Loader } from '@/components/loader';
import { useTranslations } from 'next-intl';

const SignInPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SignInContent />
    </Suspense>
  );
};

const SignInContent = () => {
  const t = useTranslations('sign-in');

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
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.message}>
          {loading && status === 'loading' && t('loadingMessage')}
          {status === 'authenticated' && t('successMessage')}
          {!loading &&
            status !== 'loading' &&
            status === 'unauthenticated' &&
            t('errorMessage')}
        </p>
        {status === 'unauthenticated' && (
          <Link
            className={styles.buttonLink}
            href={`https://t.me/${envConfig.USERNAME_BOT}`}
            rel="noreferrer nofollow noopener"
            target="_blank"
            passHref
          >
            {t('telegramButtonText')}
          </Link>
        )}
        {status === 'authenticated' && (
          <Link className={styles.buttonLink} href="/">
            {t('homeButtonText')}
          </Link>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
