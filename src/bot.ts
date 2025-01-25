import { autoRetry } from '@grammyjs/auto-retry';
import { Bot, session } from 'grammy';

import { config } from '@/config';
import { loadCommands, loadHears } from '@/loader';
import { loggerMiddleware } from '@/middlewares/logger';
import { privateOnlyMiddleware } from '@/middlewares/private-only';
import { setConfigMiddleware } from '@/middlewares/set-config-middleware';
import { registerCronTasks } from '@/tasks';
import { CustomContext } from '@/types';
import { setErrorHandler } from '@/utils/set-error-handler';
import { setMyCommands } from '@/utils/set-my-commands';

export const bot = new Bot<CustomContext>(config.API_TOKEN);

registerCronTasks(bot);

setErrorHandler(bot);
bot.api.config.use(
  autoRetry({
    maxRetryAttempts: 1,
    maxDelaySeconds: 5,
  })
);
bot.use(session({ initial: () => ({}) }));
await setMyCommands(bot);

bot.use(privateOnlyMiddleware);
bot.use(loggerMiddleware);
bot.use(setConfigMiddleware);

await loadCommands(bot);
await loadHears(bot);

process.once('SIGINT', () => bot.stop());
process.once('SIGTERM', () => bot.stop());

await bot.start();
