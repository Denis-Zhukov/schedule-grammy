'use client';

import {
  LoginButton as TelegramLoginButton,
  TelegramAuthData,
} from '@telegram-auth/react';

import { config } from '@/config';
import { signIn, SignInAuthorizationParams } from 'next-auth/react';

export const LoginButton = () => {
  const handleTelegramAuth = async (data: TelegramAuthData) => {
    await signIn(
      'telegram-login',
      { callbackUrl: '/' },
      data as unknown as SignInAuthorizationParams,
    );
  };

  return (
    <TelegramLoginButton
      botUsername={config.USERNAME_BOT}
      buttonSize="large"
      cornerRadius={20}
      showAvatar={true}
      requestAccess="write"
      onAuthCallback={handleTelegramAuth}
    />
  );
};
