import { InlineKeyboard } from 'grammy';

import { LanguageCode, languages } from '@bot/constants/languages';

type GenerateMoreInlineKeyboardParams = {
  lang: LanguageCode;
  isTeacher: boolean;
};

export const moreInlineKeyboard = ({
  lang,
  isTeacher,
}: GenerateMoreInlineKeyboardParams) => {
  const labels = languages[lang].moreInlineKeyboard;

  const inlineKeyboardItems = [
    [labels.adminSchedule, 'admin-schedule'],
    [labels.callSchedule, 'call-schedule'],
    [labels.chooseTeacher, 'reset-settings'],
    [labels.contacts, 'contacts'],
  ];

  if (isTeacher) {
    inlineKeyboardItems.unshift([labels.schedule, 'configure-schedule']);
  } else {
    inlineKeyboardItems.unshift([labels.imTeacher, 'im-teacher']);
  }

  return new InlineKeyboard(
    inlineKeyboardItems.map(([label, data]) => [
      { text: label, callback_data: data },
    ]),
  );
};
