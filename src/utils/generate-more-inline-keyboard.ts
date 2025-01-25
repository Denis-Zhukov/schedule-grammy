import { InlineKeyboard } from 'grammy';

import { LanguageCode, languages } from '@/constants/languages';

export const generateMoreInlineKeyboard = (lang: LanguageCode) => {
  const labels = languages[lang].moreInlineKeyboard;

  const inlineKeyboardItems = [
    [labels.adminSchedule, 'admin-schedule'],
    [labels.callSchedule, 'call-schedule'],
    [labels.reset, 'reset'],
    [labels.contacts, 'contacts'],
  ];

  return new InlineKeyboard(
    inlineKeyboardItems.map(([label, data]) => [
      { text: label, callback_data: data },
    ])
  );
};
