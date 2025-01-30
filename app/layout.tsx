import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import { AuthProvider } from './auth-provider';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ReactQueryProvider } from '@/app/react-query-provider';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Schedule Management',
  description:
    'A platform for managing schedules and organizing teaching processes for educators.',
  keywords:
    'schedule, teachers, school, organization, planning, educational process',
  creator: 'Denis Zhukov',
  openGraph: {
    title: 'Teacher Schedule Management',
    description:
      'A platform for managing schedules and organizing teaching processes for educators.',
    siteName: 'Teacher Schedule Management',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${roboto.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <AppRouterCacheProvider>
            <AuthProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </AuthProvider>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
