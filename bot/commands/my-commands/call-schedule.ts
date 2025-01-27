import { InputFile } from 'grammy';
import { resolve } from 'path';

import { CustomContext } from '@bot/types';

const callSchedule = async (ctx: CustomContext) => {
  const file = new InputFile(resolve('files', 'call-schedule.jpg'));
  await ctx.replyWithPhoto(file);
};

export default callSchedule;
