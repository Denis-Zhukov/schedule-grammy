import styles from './style.module.css';
import Link from 'next/link';
import { getMessages } from 'next-intl/server';

export const NotFoundPage = async () => {
  const messages = (await getMessages())['404'] as Record<string, string>;
  const t = (key: string) => (messages[key] || key) as string;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.message}>{t('message')}</p>
        <Link href="/" className={styles.buttonLink}>
          {t('buttonText')}
        </Link>
      </div>
    </div>
  );
};
