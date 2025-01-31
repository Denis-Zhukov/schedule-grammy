import { InputFile } from 'grammy';
import { resolve } from 'path';

import { CustomContext } from '@bot/types';

export const adminScheduleImage = async (ctx: CustomContext) => {
  const file = new InputFile(resolve('files', 'admin-schedule.jpg'));
  await ctx.replyWithPhoto(file);
};
