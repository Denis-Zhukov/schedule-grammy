import { prisma } from '@bot/utils/prisma-client';
import { LanguageCode, languages } from '@bot/constants/languages';
import { differenceInMinutes } from 'date-fns';
import { DayOfWeek } from '@prisma/client';
import { CustomContext } from '@bot/types';
import { escapeMarkdownV2 } from '@bot/utils/escape-markdown';

type GetScheduleProps = {
  followingTeacherId: string;
  dayOfWeek: DayOfWeek;
  lang: LanguageCode;
};

export const getSchedule = async (
  ctx: CustomContext,
  { lang, followingTeacherId, dayOfWeek }: GetScheduleProps,
) => {
  const schedule = await prisma.schedule.findMany({
    where: { teacherId: followingTeacherId, dayOfWeek },
    select: {
      dayOfWeek: true,
      lesson: true,
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
    where: { id: followingTeacherId },
  }))!;

  if (schedule.length === 0) {
    return await ctx.reply(languages[lang].holiday, {
      parse_mode: 'MarkdownV2',
    });
  }

  const teacher = await prisma.teacher.findFirst({
    where: { id: followingTeacherId },
  });

  if (!teacher) return;

  let prevLessonEndTime = null;
  let currentLessonStart = null;

  let response = `*${escapeMarkdownV2(surname)} ${escapeMarkdownV2(name)} ${escapeMarkdownV2(patronymic ?? '')}*\n\n`;
  for (const {
    lesson,
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
      // 75 = 15 + 45 + 15; 75 - максимальный перерыв + урок + максимальный перерыв = максимальное время урока
      // 45 - максимальный перерыв = 30 минут урока + 15 перемена
      if (minutes > 45)
        response += `${languages[lang].gap}\n\n`.repeat(
          Math.ceil(minutes / 75),
        );
    }

    response += `${languages[lang].lesson({
      lesson,
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
