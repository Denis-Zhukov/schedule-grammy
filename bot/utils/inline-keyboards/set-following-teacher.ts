import { Teacher } from '@prisma/client';
import { InlineKeyboard } from 'grammy';

type GenerateMoreInlineKeyboardParams = {
  teachers: Teacher[];
};

export const setFollowingTeacherInlineKeyboard = ({
  teachers,
}: GenerateMoreInlineKeyboardParams) => {
  const inlineKeyboardItems = [] as string[][];

  for (const { id, surname, name, patronymic, disabled } of teachers) {
    if (!disabled) {
      inlineKeyboardItems.push([`${surname} ${name} ${patronymic}`, id]);
    }
  }

  if (!inlineKeyboardItems.length) return null;

  return new InlineKeyboard(
    inlineKeyboardItems.map(([label, data]) => [
      { text: label, callback_data: 'set-teacher ' + data },
    ]),
  );
};
