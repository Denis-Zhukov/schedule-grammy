import { differenceInMinutes } from 'date-fns';

import { LanguageCode, languages } from '@/constants/languages';
import { CustomContext } from '@/types';
import { prisma } from '@/utils/prisma-client';

export const weekdaySchedule = async (ctx: CustomContext) => {
  const user = await prisma.user.findUnique({
    where: { id: ctx.chat?.id ?? 0 },
  });

  if (!user || !user.followingTeacherId) return;

  const lang = ctx.config.lang;

  const schedule = await prisma.schedule.findMany({
    where: { teacherId: user.followingTeacherId },
    select: {
      dayOfWeek: true,
      class: true,
      subclass: true,
      timeStart: true,
      timeEnd: true,
      classroom: true,
      canteen: true,
      lead: true,
    },
    orderBy: { timeStart: 'asc' },
  });

  const { name, surname, patronymic } = (await prisma.teacher.findUnique({
    where: { id: user.followingTeacherId },
  }))!;

  if (schedule.length === 0) {
    return await ctx.reply('Выходной');
  }

  const teacher = await prisma.teacher.findFirst({
    where: { id: user.followingTeacherId },
  });
  if (!teacher) return;

  let prevLessonEndTime = null;
  let currentLessonStart = null;

  let response = `*${surname} ${name} ${patronymic}*\n\n`;
  for (const {
    class: className,
    subclass,
    timeStart,
    timeEnd,
    classroom,
    canteen,
    lead,
  } of schedule) {
    currentLessonStart = timeStart;

    if (prevLessonEndTime) {
      const minutes = differenceInMinutes(
        currentLessonStart,
        prevLessonEndTime,
      );
      // 75 = 15 + 45 + 15; 75 = максимальный перерыв + урок + максимальный перерыв - максимальное время урока
      // 45 - максимальный перерыв = 30 минут урока + 15 перемена
      if (minutes > 45) response += '\t\t\n\n'.repeat(Math.ceil(minutes / 75));
    }

    response += `${languages[lang].lesson({
      className,
      subclass,
      timeStart,
      timeEnd,
      classroom,
      teacher,
      canteen,
      lead,
    })}\n\n`;

    prevLessonEndTime = timeEnd;
  }

  await ctx.reply(response, { parse_mode: 'MarkdownV2' });
};

const routes: string[] = [];

Object.keys(languages).forEach((lang) => {
  routes.push(...languages[lang as LanguageCode].keyboardMenuItems[0]);
  routes.push(
    ...languages[lang as LanguageCode].keyboardMenuItems[1].slice(0, 3),
  );
});

export default [routes, weekdaySchedule];
