import { ZodError } from 'zod';

import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';
import { prisma } from '@bot/utils/prisma-client';
import { setParseUserString } from '@bot/utils/validations/parse-set-teacher-string';

const setTeacher = async (ctx: CustomContext) => {
  if (!ctx.config.isAdmin) return;

  const lang = ctx.config.lang;

  try {
    const { id, surname, name, patronymic } = setParseUserString(
      ctx.match as string,
    );

    const { user } = await prisma.teacher.upsert({
      where: { userId: id },
      create: {
        userId: id,
        surname,
        name,
        patronymic,
      },
      update: {
        surname,
        name,
        patronymic,
      },
      select: {
        user: true,
      },
    });

    await ctx.reply(languages[lang].isTeacherNow(user.surname, user.name));
  } catch (e) {
    if (e instanceof ZodError) {
      await ctx.reply(e.issues.map(({ message }) => message).join('\n'));
    } else if (e instanceof Error && 'code' in e && e.code === 'P2003') {
      await ctx.reply(languages[lang].notFound);
    } else throw e;
  }
};

export default ['set_teacher', setTeacher];
