'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { useTranslations } from 'next-intl';

const SignOutPage = () => {
  const t = useTranslations();

  useEffect(() => {
    signOut();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {t('sign-out')}
      </Typography>
      <CircularProgress />
    </Container>
  );
};

export default SignOutPage;
