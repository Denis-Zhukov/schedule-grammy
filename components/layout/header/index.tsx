import React from 'react';
import styles from './style.module.css';
import { LanguageSwitcher } from '@/components/language-switcher';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <LanguageSwitcher
        cookieName="locale"
        locales={{ en: 'English', ru: 'Русский' }}
      />
    </header>
  );
};
