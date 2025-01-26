import { InlineKeyboard } from 'grammy';

import { LanguageCode } from '@/constants/languages';

type GenerateSelectDayInlineKeyboardParams = {
  lang: LanguageCode;
};

export const generateSelectDayInlineKeyboard = ({
  lang,
}: GenerateSelectDayInlineKeyboardParams) => {
  console.log(lang);
  return new InlineKeyboard([
    [{ text: 'Загрузить файл', callback_data: 'load-file' }],
  ]);
};
