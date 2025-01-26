import { InlineKeyboard } from 'grammy';

import { LanguageCode, languages } from '@/constants/languages';

type GenerateConfigureScheduleInlineKeyboardParams = {
  lang: LanguageCode;
};

export const generateConfigureScheduleInlineKeyboard = ({
  lang,
}: GenerateConfigureScheduleInlineKeyboardParams) => {
  const buttonRows = languages[lang].daysOfWeek.map(([label, data]) => [
    InlineKeyboard.text(label, 'select-day ' + data),
  ]);

  buttonRows.push([InlineKeyboard.text(languages[lang].back, 'more')]);

  return InlineKeyboard.from(buttonRows);
};
