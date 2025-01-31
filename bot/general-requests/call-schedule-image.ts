import { InputFile } from 'grammy';
import { resolve } from 'path';

import { CustomContext } from '@bot/types';

export const callScheduleImage = async (ctx: CustomContext) => {
  const file = new InputFile(resolve('files', 'call-schedule.jpg'));
  await ctx.replyWithPhoto(file);
  await ctx.answerCallbackQuery();
};
