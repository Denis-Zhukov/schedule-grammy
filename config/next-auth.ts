import { AuthDataValidator, objectToAuthDataMap } from '@telegram-auth/server';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '@/config';
import { pages } from '@/config/pages';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'telegram',
      name: 'Telegram Login',
      credentials: {},
      async authorize(_, req) {
        try {
          const validator = new AuthDataValidator({
            botToken: config.API_TOKEN,
          });

          const data = objectToAuthDataMap(req.query || req.body || {});

          const user = await validator.validate(data);

          if (user?.id && user?.first_name) {
            return {
              id: user.id,
              email: user.id.toString(),
              name: `${user.first_name} ${user.last_name || ''}`.trim(),
            };
          }
          return null;
        } catch (error) {
          console.error('Error during Telegram authorization:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session?.user?.email) {
        session.user.id = parseInt(session.user.email, 10);
      }
      return session;
    },
  },
  pages: pages,
};
