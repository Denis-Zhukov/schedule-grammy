import { languages } from '@bot/constants/languages';
import { getWeekday } from '@bot/constants/weekday-mapping';
import { CustomContext } from '@bot/types';
import { prisma } from '@bot/utils/prisma-client';
import { toZonedTime } from 'date-fns-tz';
import { timezone } from '@bot/constants/time';
import { DayOfWeek } from '@prisma/client';
import { addDays } from 'date-fns/addDays';
import { getSchedule } from '@bot/general-requests/get-schedule';

export const tomorrowSchedule = async (ctx: CustomContext) => {
  const user = await prisma.user.findUnique({
    where: { id: ctx.chat?.id ?? 0 },
  });

  const lang = ctx.config.lang;

  if (!user || !user.followingTeacherId)
    return ctx.reply(languages[lang].teacherNotChoose);

  const today = toZonedTime(new Date(), timezone);
  const dayOfWeek = getWeekday(addDays(today, 1)) as DayOfWeek;

  await getSchedule(ctx, {
    dayOfWeek,
    followingTeacherId: user.followingTeacherId,
    lang,
  });
};

export default [['Tomorrow', 'Завтра'], tomorrowSchedule];
