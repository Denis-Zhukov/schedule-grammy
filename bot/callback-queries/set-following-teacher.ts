import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';
import { prisma } from '@bot/utils/prisma-client';

const setFollowingTeacher = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  try {
    const userId = ctx.from?.id;

    const [, teacherId] = (ctx.callbackQuery?.data ?? '').split(' ');

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        followingTeacherId: teacherId,
      },
      select: {
        followingTeacher: {
          select: { surname: true, name: true, patronymic: true },
        },
      },
    });

    if (!user || !user.followingTeacher)
      return ctx.reply(languages[lang].error);

    const { surname, name, patronymic } = user.followingTeacher;

    await ctx.reply(
      languages[lang].youFollowNow(surname, name, patronymic ?? ''),
    );
    await ctx.answerCallbackQuery();
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'P2025') {
      await ctx.reply(languages[lang].noAccount);
    } else throw e;
  }
};

export default [/set-teacher .*/, setFollowingTeacher];
