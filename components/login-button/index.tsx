import { LoginButton as TelegramLoginButton } from '@telegram-auth/react';
import { signIn, SignInAuthorizationParams } from 'next-auth/react';

import { config } from '@/config';

export const LoginButton = () => {
  return (
    <TelegramLoginButton
      botUsername={config.USERNAME_BOT}
      onAuthCallback={(data) => {
        signIn(
          'telegram-login',
          { callbackUrl: config.NEXTAUTH_URL },
          data as unknown as SignInAuthorizationParams,
        );
      }}
    />
  );
};
