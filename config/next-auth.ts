import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pages } from '@/config/pages';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';
import { envConfig } from '@/env-config';
import { NoUserException } from '@/utils/exceptions/no-user-exception';
import { prisma } from '@bot/utils/prisma-client';
import { NotTeacherException } from '@/utils/exceptions/not-teacher';
import { InvalidTokenException } from '@/utils/exceptions/invalid-token';
import { UnexpectedErrorException } from '@/utils/exceptions/unexpected-error';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: envConfig.TOKEN_LIFETIME,
    updateAge: envConfig.TOKEN_LIFETIME * 10,
  },
  providers: [
    CredentialsProvider({
      id: 'telegram',
      name: 'Telegram Token',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const user = jwt.verify(
            credentials!.token,
            envConfig.AUTH_SECRET,
          ) as JWT;

          if (!user) throw new NoUserException();

          const isTeacher = await prisma.teacher.findUnique({
            where: { userId: user.id },
          });

          if (!isTeacher) throw new NotTeacherException();

          return {
            id: user.id,
            isTeacher: user.isTeacher,
            surname: user.surname,
            name: user.name,
          };
        } catch (e) {
          if (e instanceof JsonWebTokenError) throw new InvalidTokenException();
          if (e instanceof NoUserException || e instanceof NotTeacherException)
            throw e;
          throw new UnexpectedErrorException();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.surname = user.surname;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = Number(token.id ?? token.sub);
      session.user.name = token.name;
      session.user.surname = token.surname;

      return session;
    },
  },
  pages,
};
