import { LanguageCode, languages } from '../constants/languages';
import { CustomContext } from '@/types';

export const weekdaySchedule = async (ctx: CustomContext) => {
  await ctx.reply(ctx.message!.text + '');
};

const routes: string[] = [];

Object.keys(languages).forEach((lang) => {
  routes.push(...languages[lang as LanguageCode].keyboardMenuItems[0]);
  routes.push(
    ...languages[lang as LanguageCode].keyboardMenuItems[1].slice(0, 3),
  );
});

export default [routes, weekdaySchedule];
