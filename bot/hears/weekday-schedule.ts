import { LanguageCode, languages } from '@bot/constants/languages';
import { weekdayMapping } from '@bot/constants/weekday-mapping';
import { CustomContext } from '@bot/types';
import { prisma } from '@bot/utils/prisma-client';
import { getSchedule } from '@bot/general-requests/get-schedule';

export const weekdaySchedule = async (ctx: CustomContext) => {
  const user = await prisma.user.findUnique({
    where: { id: ctx.chat?.id ?? 0 },
  });

  const lang = ctx.config.lang;

  if (!user || !user.followingTeacherId)
    return ctx.reply(languages[lang].teacherNotChoose);

  const weekdayKey = ctx.message?.text as keyof typeof weekdayMapping;
  const dayOfWeek = weekdayMapping[weekdayKey];

  await getSchedule(ctx, {
    lang,
    followingTeacherId: user.followingTeacherId,
    dayOfWeek,
  });
};

const routes: string[] = [];

Object.keys(languages).forEach((lang) => {
  routes.push(...languages[lang as LanguageCode].keyboardMenuItems[0]);
});

export default [routes, weekdaySchedule];
