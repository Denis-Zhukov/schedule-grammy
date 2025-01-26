import { config } from '@/config';
import { languages } from '@/constants/languages';
import { CustomContext } from '@/types';

const imTeacher = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  await ctx.reply(languages[lang].answerToImTeacher(config.ADMIN_USERNAME));
  await ctx.answerCallbackQuery();
};

export default ['im-teacher', imTeacher];
