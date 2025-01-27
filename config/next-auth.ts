import { AuthDataValidator, objectToAuthDataMap } from '@telegram-auth/server';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { pages } from '@/config/pages';
console.log(process.env);
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'telegram-login',
      name: 'Telegram Login',
      credentials: {},
      async authorize(_, req) {
        const validator = new AuthDataValidator({
          botToken: process.env.API_TOKEN,
        });

        const data = objectToAuthDataMap(req.query || req.body || {});
        const user = await validator.validate(data);

        if (user.id && user.first_name) {
          return {
            id: user.id,
            email: user.id.toString(),
            name: [user.first_name, user.last_name || ''].join(' '),
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      session.user.id = +session.user.email;
      return session;
    },
    redirect({ baseUrl }) {
      return process.env.NEXTAUTH_URL || baseUrl;
    },
  },
  pages: pages,
};
