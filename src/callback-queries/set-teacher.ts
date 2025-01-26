import { languages } from '@/constants/languages';
import { CustomContext } from '@/types';
import { prisma } from '@/utils/prisma-client';

const setTeacher = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;
  const userId = ctx.from?.id;

  const [, teacherId] = (ctx.callbackQuery?.data ?? '').split(' ');

  await prisma.user.update({
    where: { id: userId },
    data: {
      followingTeacherId: teacherId,
    },
  });

  await ctx.reply(languages[lang].success);
  await ctx.answerCallbackQuery();
};

export default [/set-teacher .*/, setTeacher];
