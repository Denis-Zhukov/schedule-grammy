import { envConfig } from '@/env-config';
import { languages } from '@bot/constants/languages';
import { CustomContext } from '@bot/types';

export const contacts = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  await ctx.reply(languages[lang].contacts(envConfig.ADMIN_USERNAME));
};
