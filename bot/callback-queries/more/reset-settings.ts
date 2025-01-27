import { CustomContext } from '@bot/types';
import { generateSetFollowingTeacherInlineKeyboard } from '@bot/utils/inline-keyboards/generate-set-following-teacher-inline-keyboard';
import { prisma } from '@bot/utils/prisma-client';

const resetSettings = async (ctx: CustomContext) => {
  const teachers = await prisma.teacher.findMany({});
  const inlineKeyboard = generateSetFollowingTeacherInlineKeyboard({
    teachers,
  });

  await ctx.reply('Выбери учителя', { reply_markup: inlineKeyboard });
  await ctx.answerCallbackQuery();
};

export default ['reset-settings', resetSettings];
