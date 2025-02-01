'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Tooltip } from '@mui/material';
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
    <Tooltip title={`${t('switch-to')} ${locales[nextLocale]}`} arrow>
      <Button
        onClick={switchLanguage}
        variant="outlined"
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          padding: '6px 12px',
          borderRadius: '8px',
          fontSize: '0.875rem',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          transition:
            'background 0.3s ease, transform 0.2s ease, border 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
            transform: 'scale(1.05)',
            borderColor: 'rgba(255, 255, 255, 0.7)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        {t('switch-to')} {locales[nextLocale]}
      </Button>
    </Tooltip>
  );
};
