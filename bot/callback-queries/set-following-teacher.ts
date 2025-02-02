import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';
import { prisma } from '@bot/utils/prisma-client';

const setFollowingTeacher = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;
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

  if (!user || !user.followingTeacher) return ctx.reply(languages[lang].error);

  const { surname, name, patronymic } = user.followingTeacher;

  await ctx.reply(
    languages[lang].youFollowNow(surname, name, patronymic ?? ''),
  );
  await ctx.answerCallbackQuery();
};

export default [/set-teacher .*/, setFollowingTeacher];
