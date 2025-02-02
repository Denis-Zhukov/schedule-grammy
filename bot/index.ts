import { autoRetry } from '@grammyjs/auto-retry';
import { Bot, session } from 'grammy';

import { envConfig } from '@/env-config';
import { loadCallbackQueries, loadCommands, loadHears } from '@bot/loader';
import { loggerMiddleware } from '@bot/middlewares/logger';
import { privateOnlyMiddleware } from '@bot/middlewares/private-only';
import { setConfigMiddleware } from '@bot/middlewares/set-config-middleware';
import { registerCronTasks } from '@bot/tasks';
import { CustomContext } from '@bot/types';
import { setErrorHandler } from '@bot/utils/set-error-handler';
import { setMyCommands } from '@bot/utils/set-my-commands';

const token = envConfig.API_TOKEN;

if (!token)
  throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.');

export const bot = new Bot<CustomContext>(token);

registerCronTasks(bot);

setErrorHandler(bot);
bot.api.config.use(
  autoRetry({
    maxRetryAttempts: 1,
    maxDelaySeconds: 5,
  }),
);
bot.use(session({ initial: () => ({}) }));
await setMyCommands(bot);

bot.use(privateOnlyMiddleware);
bot.use(loggerMiddleware);
bot.use(setConfigMiddleware);

await loadCommands(bot);
await loadHears(bot);
await loadCallbackQueries(bot);
