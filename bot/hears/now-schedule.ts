import { languages } from '@bot/constants/languages';
import { getWeekday } from '@bot/constants/weekday-mapping';
import { CustomContext } from '@bot/types';
import { prisma } from '@bot/utils/prisma-client';
import { toZonedTime } from 'date-fns-tz';
import { timezone } from '@bot/constants/time';
import { DayOfWeek } from '@prisma/client';
import { getDifferenceInHoursAndMinutes } from '@bot/utils/time/get-difference-in-hours-and-minutes';

export const weekdaySchedule = async (ctx: CustomContext) => {
  const user = await prisma.user.findUnique({
    where: { id: ctx.chat?.id ?? 0 },
  });

  if (!user || !user.followingTeacherId) return;

  const lang = ctx.config.lang;

  const now = toZonedTime(new Date(), timezone);
  const dayOfWeek = getWeekday(now) as DayOfWeek;
  now.setFullYear(1970, 0, 1);

  const data = await prisma.schedule.findFirst({
    where: {
      teacherId: user.followingTeacherId,
      dayOfWeek,
      OR: [
        {
          timeStart: {
            lte: now,
          },
          timeEnd: {
            gte: now,
          },
        },
        {
          timeStart: {
            gt: now,
          },
        },
      ],
    },
    orderBy: {
      timeStart: 'asc',
    },
    select: {
      lesson: true,
      class: true,
      subclass: true,
      classroom: true,
      teacher: true,
      lead: true,
      canteen: true,
      timeStart: true,
      timeEnd: true,
    },
  });

  if (!data) return ctx.reply('Отдыхаем на сегодня');

  const {
    lesson,
    classroom,
    canteen,
    lead,
    subclass,
    class: className,
    teacher,
    timeStart,
    timeEnd,
  } = data;

  const nowUTC = toZonedTime(new Date(now.getTime()), 'UTC');

  let toLesson = '';
  if (timeStart > nowUTC || nowUTC > timeEnd) {
    const { hours, minutes } = getDifferenceInHoursAndMinutes(now, timeStart);
    toLesson = `\n\nСейчас урока нет\\. До следущего урока\\: ${hours > 0 ? `${hours} ч\\. ` : ''} ${minutes > 0 ? `${minutes} мин\\.` : ''}`;
  }

  await ctx.reply(
    `Сейчас\\:${toLesson}\n\n${languages[lang].lesson({
      lesson,
      className,
      subclass,
      timeStart,
      timeEnd,
      classroom,
      teacher,
      canteen,
      lead,
    })}`,
    { parse_mode: 'MarkdownV2' },
  );
};

export default [['Now', 'Сейчас'], weekdaySchedule];
