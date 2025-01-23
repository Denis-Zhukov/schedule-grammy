import { Bot, GrammyError, HttpError } from 'grammy';

import { config } from '@/config';
import { buttonMenu } from '@/constants/button-menu';
import { loadCommands } from '@/loader';
import { loggerMiddleware } from '@/middlewares/logger';
import { privateOnlyMiddleware } from '@/middlewares/private-only';
import { registerTasks } from '@/tasks';
import { logger } from '@/utils/logger';

registerTasks();

export const bot = new Bot(config.API_TOKEN);

bot.use(privateOnlyMiddleware);
bot.use(loggerMiddleware);

await loadCommands(bot);

await bot.api.setMyCommands(buttonMenu);

bot.catch((err) => {
  const e = err.error;
  if (e instanceof GrammyError) {
    logger.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    logger.error('Could not contact Telegram:', e);
  } else {
    logger.error('Unknown error:', e);
  }

  logger.error(`STACK: ${err.stack}:`);
  err.ctx.reply('У нас произошла ошибка, извините :c');
  bot.api.sendMessage(
    config.ADMIN_ID,
    'Произошла ошибка, глянь, что случилось'
  );
});

await bot.start();
