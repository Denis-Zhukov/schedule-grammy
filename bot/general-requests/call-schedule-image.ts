import { InputFile } from 'grammy';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { CustomContext } from '@bot/types';

const fileBuffer = readFileSync(resolve('files', 'call-schedule.jpg'));
const file = new InputFile(fileBuffer);

export const callScheduleImage = async (ctx: CustomContext) => {
  await ctx.replyWithPhoto(file);
};
