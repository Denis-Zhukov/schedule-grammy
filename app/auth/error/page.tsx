import styles from './style.module.css';
import { config } from '@/config';
import Link from 'next/link';

const errorMessages: Record<string, string> = {
  CredentialsSignin: 'Неверный токен. Попробуйте снова.',
  InvalidToken: 'Неверный токен. Попробуйте снова.',
  NoUser: 'Неверный токен. Попробуйте снова.',
  NotTeacher: 'Вы не учитель',
  UnexpectedError: 'Произошла неизвестная ошибка.',
  default: 'Произошла неизвестная ошибка.',
};

export type ErrorPageProps = {
  searchParams: Promise<Record<string, string | undefined>>;
};

const ErrorPage = async ({ searchParams }: ErrorPageProps) => {
  const params = await searchParams;
  const error = params?.error || 'default';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Ошибка</h1>
        <p className={styles.message}>
          {errorMessages[error] || errorMessages.default}
        </p>
        <Link
          className={styles.buttonLink}
          href={`https://t.me/${config.USERNAME_BOT}`}
          rel="noreferrer nofollow noopener"
          target="_blank"
          passHref
        >
          Перейти в Telegram
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
