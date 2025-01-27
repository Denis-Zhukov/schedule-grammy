import { config } from '@bot/config';
import { LoginButton as TelegramLoginButton } from '@telegram-auth/react';
import { signIn, SignInAuthorizationParams } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <TelegramLoginButton
      botUsername={config.USERNAME_BOT}
      onAuthCallback={(data) => {
        signIn(
          'telegram-login',
          {},
          data as unknown as SignInAuthorizationParams,
        );
      }}
    />
  );
};
