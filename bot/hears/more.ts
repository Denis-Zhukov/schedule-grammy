import { LanguageCode, languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';
import { generateMoreInlineKeyboard } from '@bot/utils/inline-keyboards/generate-more-inline-keyboard';
import { prisma } from '@bot/utils/prisma-client';

const more = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  const id = ctx.from!.id;
  const teacher = await prisma.teacher.findUnique({ where: { userId: id } });

  const inlineKeyboard = generateMoreInlineKeyboard({
    lang,
    isTeacher: !!teacher,
  });

  await ctx.reply('-', {
    reply_markup: inlineKeyboard,
  });
};

const routes: string[] = [];

Object.keys(languages).forEach((lang) => {
  routes.push(languages[lang as LanguageCode].keyboardMenuItems[1].at(-1)!);
});

export default [routes, more];
