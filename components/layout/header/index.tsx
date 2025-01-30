'use client';
import React, { useState } from 'react';
import styles from './style.module.css';
import { LanguageSwitcher } from '@/components/language-switcher';
import { AddLessonModal } from '@/components/modals/add-lesson';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('header');

  return (
    <header className={styles.header}>
      <LanguageSwitcher
        cookieName="locale"
        locales={{ en: 'English', ru: 'Русский' }}
      />

      <Button variant="contained" onClick={() => setOpen(true)}>
        {t('add-lesson')}
      </Button>
      <AddLessonModal open={open} handleClose={() => setOpen(false)} />
    </header>
  );
};
