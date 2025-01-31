import { LanguageCode, languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';
import { moreInlineKeyboard } from '@bot/utils/inline-keyboards/more';
import { prisma } from '@bot/utils/prisma-client';

const more = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  const id = ctx.from!.id;

  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      teacher: { select: { surname: true, name: true, patronymic: true } },
      followingTeacher: {
        select: { surname: true, name: true, patronymic: true },
      },
    },
  });

  if (!user) return ctx.reply(languages[lang].noAccount);

  const inlineKeyboard = moreInlineKeyboard({
    lang,
    isTeacher: !!user!.teacher,
  });

  let answer = '';

  if (user.teacher) {
    const { surname, name, patronymic } = user.teacher;
    answer += `${languages[lang].youAreTeacher(surname, name, patronymic ?? '')}\n\n`;
  }

  if (user.followingTeacher) {
    const { surname, name, patronymic } = user.followingTeacher;
    answer += languages[lang].youFollow(surname, name, patronymic ?? '');
  } else {
    answer += languages[lang].youUnfollow;
  }

  await ctx.reply(answer, {
    reply_markup: inlineKeyboard,
  });
};

const routes = Object.keys(languages).map((lang) =>
  languages[lang as LanguageCode].keyboardMenuItems[1].at(-1),
);

export default [routes, more];
