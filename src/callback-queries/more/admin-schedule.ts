import { InputFile } from 'grammy';
import { resolve } from 'path';

import { CustomContext } from '@/types';

const adminSchedule = async (ctx: CustomContext) => {
  const file = new InputFile(resolve('files', 'admin-schedule.jpg'));
  await ctx.replyWithPhoto(file);
  await ctx.answerCallbackQuery();
};

export default ['admin-schedule', adminSchedule];
