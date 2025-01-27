import { objectToAuthDataMap, AuthDataValidator } from '@telegram-auth/server';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pages } from '@/config/pages';
import { logger } from '@bot/utils/logger';

export const authOptions: NextAuthOptions = {
  debug: true,
  logger: {
    debug: (code, metadata) => logger.debug(code, metadata),
    error: (code, metadata) => logger.error(code, metadata),
    warn: (code) => logger.warn(code),
  },
  providers: [
    CredentialsProvider({
      id: 'telegram-login',
      name: 'Telegram Login',
      credentials: {},
      async authorize(_, req) {
        const validator = new AuthDataValidator({
          botToken: `${process.env.API_TOKEN}`,
        });

        const data = objectToAuthDataMap(req.query || req.body || {});
        const user = await validator.validate(data);

        if (user.id && user.first_name) {
          const returned = {
            id: user.id.toString(),
            email: user.id.toString(),
            name: [user.first_name, user.last_name || ''].join(' '),
            image: user.photo_url,
          };

          console.log(user);

          return returned;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      console.log(session);
      session.user.id = session.user.email;
      return session;
    },
  },
  pages: pages,
};
