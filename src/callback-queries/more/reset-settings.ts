import { CustomContext } from '@/types';
import { generateSetFollowingTeacherInlineKeyboard } from '@/utils/inline-keyboards/generate-set-following-teacher-inline-keyboard';
import { prisma } from '@/utils/prisma-client';

const resetSettings = async (ctx: CustomContext) => {
  const teachers = await prisma.teacher.findMany({});
  const inlineKeyboard = generateSetFollowingTeacherInlineKeyboard({
    teachers,
  });

  await ctx.reply('Выбери учителя', { reply_markup: inlineKeyboard });
  await ctx.answerCallbackQuery();
};

export default ['reset-settings', resetSettings];
