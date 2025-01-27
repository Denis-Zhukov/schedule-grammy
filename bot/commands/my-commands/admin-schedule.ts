import { InputFile } from 'grammy';
import { resolve } from 'path';

import { CustomContext } from '@bot/types';

const adminSchedule = async (ctx: CustomContext) => {
  const file = new InputFile(resolve('files', 'admin-schedule.jpg'));
  await ctx.replyWithPhoto(file);
};

export default ['admin_schedule', adminSchedule];
