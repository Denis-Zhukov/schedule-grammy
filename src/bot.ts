import { Bot } from 'grammy';

import { config } from '@/config';
import { buttonMenu } from '@/constants/button-menu';
import { loadCommands } from '@/loader';
import loggerMiddleware from '@/middlewares/logger';
import privateOnly from '@/middlewares/private-only';
import { registerTasks } from '@/tasks';

registerTasks();

export const bot = new Bot(config.API_TOKEN);

bot.use(privateOnly);
bot.use(loggerMiddleware);

await loadCommands(bot);

await bot.api.setMyCommands(buttonMenu);

await bot.start();
