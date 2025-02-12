import { envConfig } from '@/env-config';
import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';

const imTeacher = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  await ctx.reply(languages[lang].answerToImTeacher(envConfig.ADMIN_USERNAME));
  await ctx.answerCallbackQuery();
};

export default ['im-teacher', imTeacher];
