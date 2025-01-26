import { CustomContext } from '@/types';
import { generateSelectDayInlineKeyboard } from '@/utils/inline-keyboards/generate-load-file-keyboard';

const selectDay = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;
  const inlineKeyboard = generateSelectDayInlineKeyboard({ lang });

  await ctx.editMessageReplyMarkup({ reply_markup: inlineKeyboard });
};

export default [/select-day/, selectDay];
