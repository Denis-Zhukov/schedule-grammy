import { ZodError } from 'zod';

import { languages } from '@/constants/languages';
import { CustomContext } from '@/types';
import { prisma } from '@/utils/prisma-client';
import { parseRemoveTeacherString } from '@/utils/validations/parse-remove-teacher';

const removeTeacher = async (ctx: CustomContext) => {
  if (!ctx.config.isAdmin) return;
  const lang = ctx.config.lang;

  try {
    const { id } = parseRemoveTeacherString(ctx.match as string);

    const { user } = await prisma.teacher.delete({
      where: { userId: id },
      select: { user: true },
    });

    await ctx.reply(languages[lang].isNotTeacherNow(user.surname, user.name));
  } catch (e) {
    if (e instanceof ZodError) {
      await ctx.reply(e.issues.map(({ message }) => message).join('\n'));
    } else if (e instanceof Error && 'code' in e && e.code === 'P2025') {
      await ctx.reply(languages[lang].isNotTeacher(ctx.match as string));
    } else throw e;
  }
};

export default removeTeacher;
