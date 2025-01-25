import { InputFile } from 'grammy';

import { logFilePath } from '@/constants/logs';
import { CustomContext } from '@/types';

const logs = async (ctx: CustomContext) => {
  if (!ctx.config.isAdmin) return;

  const logs = new InputFile(logFilePath);
  await ctx.replyWithDocument(logs);
};

export default logs;
