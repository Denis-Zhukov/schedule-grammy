import { LoginButton as TelegramLoginButton } from '@telegram-auth/react';
import { signIn } from 'next-auth/react';

import { config } from '@/config';

export const LoginButton = () => {
  return (
    <TelegramLoginButton
      botUsername={config.USERNAME_BOT}
      buttonSize="large"
      cornerRadius={20}
      showAvatar={true}
      onAuthCallback={(data) => {
        if (!data || typeof data !== 'object') {
          console.error('Invalid auth data received:', data);
          return;
        }

        signIn('telegram-login', { ...data });
      }}
    />
  );
};
