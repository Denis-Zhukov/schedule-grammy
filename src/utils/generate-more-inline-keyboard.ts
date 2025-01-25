import { InlineKeyboard } from 'grammy';

import { LanguageCode, languages } from '@/constants/languages';

type GenerateMoreInlineKeyboardParams = {
  lang: LanguageCode;
  isTeacher: boolean;
};

export const generateMoreInlineKeyboard = ({
  lang,
  isTeacher,
}: GenerateMoreInlineKeyboardParams) => {
  const labels = languages[lang].moreInlineKeyboard;

  const inlineKeyboardItems = [
    [labels.adminSchedule, 'admin-schedule'],
    [labels.callSchedule, 'call-schedule'],
    [labels.reset, 'reset'],
    [labels.contacts, 'contacts'],
  ];

  if (!isTeacher)
    inlineKeyboardItems.unshift([labels.imTeacher, 'set-teacher']);

  return new InlineKeyboard(
    inlineKeyboardItems.map(([label, data]) => [
      { text: label, callback_data: data },
    ]),
  );
};
