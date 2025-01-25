import { config } from '@/config';
import { languages } from '@/constants/languages';
import { CustomContext } from '@/types';

const contacts = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  await ctx.reply(languages[lang].contacts(config.ADMIN_USERNAME));
  await ctx.answerCallbackQuery();
};

export default contacts;
