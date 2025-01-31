import { Teacher } from '@prisma/client';
import { InlineKeyboard } from 'grammy';

type GenerateMoreInlineKeyboardParams = {
  teachers: Teacher[];
};

export const setFollowingTeacherInlineKeyboard = ({
  teachers,
}: GenerateMoreInlineKeyboardParams) => {
  const inlineKeyboardItems = teachers.map(
    ({ surname, name, patronymic, id }) => [
      `${surname} ${name} ${patronymic}`,
      id,
    ],
  );

  return new InlineKeyboard(
    inlineKeyboardItems.map(([label, data]) => [
      { text: label, callback_data: 'set-teacher ' + data },
    ]),
  );
};
