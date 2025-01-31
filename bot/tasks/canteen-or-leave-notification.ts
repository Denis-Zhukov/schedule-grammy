import { toZonedTime } from 'date-fns-tz';
import { timezone } from '@bot/constants/time';
import { getWeekday } from '@bot/constants/weekday-mapping';
import { DayOfWeek } from '@prisma/client';
import { prisma } from '@bot/utils/prisma-client';
import { CustomBot } from '@bot/types';
import { addMinutes } from 'date-fns/addMinutes';

export const canteenOrLeaveNotification = async (bot: CustomBot) => {
  const now = toZonedTime(new Date(), timezone);
  const dayOfWeek = getWeekday(now) as DayOfWeek;
  now.setFullYear(1970, 0, 1);

  const fiveMinutesLater = addMinutes(now, 6);

  const lessonsEndingSoon = await prisma.schedule.findMany({
    where: {
      dayOfWeek,
      timeEnd: {
        gte: now,
        lte: fiveMinutesLater,
      },
      OR: [{ canteen: true }, { lead: true }],
    },
    select: {
      teacher: { select: { userId: true } },
      canteen: true,
      lead: true,
    },
  });

  if (!lessonsEndingSoon || lessonsEndingSoon.length === 0) return;

  for (const {
    canteen,
    lead,
    teacher: { userId },
  } of lessonsEndingSoon) {
    let text = '';
    if (canteen) text += 'Это класс нужно отвести в столовку\n';
    if (lead) text += 'Это класс нужно вывести из школы\n';

    await bot.api.sendMessage(userId, text);
  }
};
