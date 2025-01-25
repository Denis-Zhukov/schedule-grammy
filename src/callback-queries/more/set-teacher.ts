import { config } from '../../config';
import { languages } from '../../constants/languages';
import { CustomContext } from '../../types';

const setTeacher = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  await ctx.reply(languages[lang].answerToImTeacher(config.ADMIN_USERNAME));
  await ctx.answerCallbackQuery();
};

export default setTeacher;
