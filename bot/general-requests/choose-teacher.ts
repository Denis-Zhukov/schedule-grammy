import { CustomContext } from '@bot/types';
import { setFollowingTeacherInlineKeyboard } from '@bot/utils/inline-keyboards/set-following-teacher';
import { prisma } from '@bot/utils/prisma-client';
import { escapeMarkdownV2 } from '@bot/utils/escape-markdown';
import { languages } from '@bot/constants/languages';

export const chooseTeacher = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  const teachers = await prisma.teacher.findMany({});
  const inlineKeyboard = setFollowingTeacherInlineKeyboard({
    teachers,
  });

  await ctx.reply(escapeMarkdownV2(languages[lang].chooseTeacher), {
    reply_markup: inlineKeyboard,
  });
  await ctx.answerCallbackQuery();
};
