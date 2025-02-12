import { GrammyError, HttpError } from 'grammy';

import { logger } from './logger';
import { envConfig } from '@/env-config';
import { languages } from '@bot/constants/languages';
import { CustomBot } from '@bot/types';

export const setErrorHandler = (bot: CustomBot) => {
  bot.catch(async (err) => {
    const e = err.error;
    const lang = err.ctx.config?.lang ?? 'en';

    if (e instanceof GrammyError) {
      logger.error('Error in request:', e.description);
    } else if (e instanceof HttpError) {
      logger.error('Could not contact Telegram:', e);
    } else {
      logger.error('Unknown error:', e);
    }

    logger.error(`STACK: ${err.stack}:`);
    await err.ctx.reply(languages[lang].error);
    await bot.api.sendMessage(
      envConfig.ADMIN_ID,
      'There was been an error, look what happened.',
    );
  });
};
