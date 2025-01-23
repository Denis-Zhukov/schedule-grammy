import { Context, InputFile } from 'grammy';

import { logFilePath } from '../constants/logs';
import { config } from '@/config';

const logs = async (ctx: Context) => {
  const id = ctx.from?.id;
  if (id !== config.ADMIN_ID) return;

  const logs = new InputFile(logFilePath);
  await ctx.replyWithDocument(logs);
};

export default logs;
