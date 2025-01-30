'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.module.css';
import { useTranslations } from 'next-intl';

export type LanguageSwitcherProps = {
  cookieName: string;
  locales: { [key: string]: string };
  defaultLocale?: string;
};

export const LanguageSwitcher = ({
  cookieName,
  locales,
  defaultLocale = Object.keys(locales)[0],
}: LanguageSwitcherProps) => {
  const router = useRouter();
  const localeKeys = Object.keys(locales);
  const [locale, setLocale] = useState<string>(defaultLocale);
  const t = useTranslations('header');

  useEffect(() => {
    const currentLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${cookieName}=`))
      ?.split('=')[1];

    if (currentLocale && localeKeys.includes(currentLocale)) {
      setLocale(currentLocale);
    }
  }, [cookieName, localeKeys]);

  const switchLanguage = () => {
    const currentIndex = localeKeys.indexOf(locale);
    const newLocale = localeKeys[(currentIndex + 1) % localeKeys.length];

    document.cookie = `${cookieName}=${newLocale}; path=/; expires=${new Date(Date.now() + 30 * 864e5).toUTCString()}`;

    router.refresh();
  };

  const nextLocale =
    localeKeys[(localeKeys.indexOf(locale) + 1) % localeKeys.length];

  return (
    <button onClick={switchLanguage} className={styles.button}>
      {t('switchTo')} {locales[nextLocale]}
    </button>
  );
};
