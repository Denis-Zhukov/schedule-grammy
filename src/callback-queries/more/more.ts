import { CustomContext } from '@/types';
import { generateMoreInlineKeyboard } from '@/utils/inline-keyboards/generate-more-inline-keyboard';
import { prisma } from '@/utils/prisma-client';

const imTeacher = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  const id = ctx.from!.id;
  const teacher = await prisma.teacher.findUnique({ where: { userId: id } });

  const inlineKeyboard = generateMoreInlineKeyboard({
    lang,
    isTeacher: !!teacher,
  });

  await ctx.editMessageReplyMarkup({
    reply_markup: inlineKeyboard,
  });
};

export default ['more', imTeacher];
