import { CustomContext } from '../types';
import { generateMoreInlineKeyboard } from '../utils/generate-more-inline-keyboard';

const more = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;

  const inlineKeyboard = generateMoreInlineKeyboard(lang);

  await ctx.reply('-', {
    reply_markup: inlineKeyboard,
  });
};

export default [['Ещё', 'More'], more];
