import { Keyboard } from 'grammy';

import { LanguageCode, languages } from '@bot/constants/languages';

export const generateKeyboardMenu = (lang: LanguageCode) =>
  Keyboard.from(
    languages[lang].keyboardMenuItems.map((row) => row.map(Keyboard.text)),
  )
    .resized()
    .persistent();
