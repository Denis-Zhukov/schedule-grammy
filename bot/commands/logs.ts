import { InputFile } from 'grammy';

import { logFilePath } from '@bot/constants/logs';
import { CustomContext } from '@bot/types';

const logs = async (ctx: CustomContext) => {
  if (!ctx.config.isAdmin) return;

  const logs = new InputFile(logFilePath);
  await ctx.replyWithDocument(logs);
};

export default ['logs', logs];
