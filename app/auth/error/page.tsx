import { getMessages } from 'next-intl/server';
import styles from './style.module.css';
import { envConfig } from '@/env-config';
import Link from 'next/link';

export type ErrorPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

type ErrorMessages = {
  title: string;
  credentialsSignin: string;
  invalidToken: string;
  noUser: string;
  notTeacher: string;
  unexpectedError: string;
  default: string;
  telegramButtonText: string;
};

const ErrorPage = async ({ searchParams }: ErrorPageProps) => {
  const params = await searchParams;
  const error = params?.error || 'default';

  const messages = (await getMessages())['error-page'] as Record<
    string,
    string
  >;
  const t = (key: keyof ErrorMessages) => messages[key] || key;

  const errorMessages: Record<string, string> = {
    CredentialsSignin: t('credentialsSignin'),
    InvalidToken: t('invalidToken'),
    NoUser: t('noUser'),
    NotTeacher: t('notTeacher'),
    UnexpectedError: t('unexpectedError'),
    default: t('default'),
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.message}>
          {errorMessages[error] || errorMessages.default}
        </p>
        <Link
          className={styles.buttonLink}
          href={`https://t.me/${envConfig.USERNAME_BOT}`}
          rel="noreferrer nofollow noopener"
          target="_blank"
          passHref
        >
          {t('telegramButtonText')}
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
