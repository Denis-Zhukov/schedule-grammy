import { CustomContext } from '@/types';
import { generateConfigureScheduleInlineKeyboard } from '@/utils/inline-keyboards/generate-configure-schedule-inline-keyboard';

const configureSchedule = async (ctx: CustomContext) => {
  const lang = ctx.config.lang;
  const inlineKeyboard = generateConfigureScheduleInlineKeyboard({ lang });

  ctx.session.selectedDay = (ctx.callbackQuery?.data ?? '').split(' ')[0];

  await ctx.editMessageReplyMarkup({ reply_markup: inlineKeyboard });
};

export default ['configure-schedule', configureSchedule];
