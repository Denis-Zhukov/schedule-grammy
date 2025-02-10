import { LanguageCode, languages } from '@bot/constants/languages';
import { more } from '@bot/general-requests/more';

const routes = Object.keys(languages).map((lang) =>
  languages[lang as LanguageCode].keyboardMenuItems[1].at(-1),
);

export default [routes, more];
