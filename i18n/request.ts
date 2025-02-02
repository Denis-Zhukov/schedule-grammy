import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { Locale, locales } from '@/i18n/config';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headersStore = await headers();

  const localeFromCookie = cookieStore.get('locale')?.value;
  const localeFromHeader = headersStore
    .get('accept-language')
    ?.split(',')[0]
    ?.split('-')[0];

  const locale = (localeFromCookie ?? localeFromHeader ?? 'en') as Locale;

  const messages = (
    await import(
      `../messages/${locales.includes(locale) ? locale : locales.at(0)}.json`
    )
  ).default;

  return {
    locale,
    messages,
  };
});
