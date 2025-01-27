import { config } from '@bot/config';
import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';

const contacts = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  await ctx.reply(languages[lang].contacts(config.ADMIN_USERNAME));
  await ctx.answerCallbackQuery();
};

export default ['contacts', contacts];
