import { autoRetry } from '@grammyjs/auto-retry';
import { Bot, session } from 'grammy';
import localtunnel from 'localtunnel';

import { config } from '@/config';
import { loadCallbackQueries, loadCommands, loadHears } from '@bot/loader';
import { loggerMiddleware } from '@bot/middlewares/logger';
import { privateOnlyMiddleware } from '@bot/middlewares/private-only';
import { setConfigMiddleware } from '@bot/middlewares/set-config-middleware';
import { registerCronTasks } from '@bot/tasks';
import { CustomContext } from '@bot/types';
import { setErrorHandler } from '@bot/utils/set-error-handler';
import { setMyCommands } from '@bot/utils/set-my-commands';

const token = process.env.API_TOKEN ?? config.API_TOKEN;

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

if (process.env.NODE_ENV === 'development') {
  const tunnel = await localtunnel({ port: 80 });
  await fetch(
    `https://api.telegram.org/bot${token}/setWebhook?url=${tunnel.url}/api/bot`,
  );
}
