import { MiddlewareFn } from 'grammy';
import { v4 } from 'uuid';

import { envConfig } from '@/env-config';
import { logger } from '@bot/utils/logger';

export const loggerMiddleware: MiddlewareFn = async (ctx, next) => {
  const { username, id } = ctx.from ?? {};

  const { text } = ctx.message ?? {};

  const userIdentifier = username ? `@${username}(${id})` : `${id}`;

  if (text) {
    logger.info(`User ${userIdentifier} sent message: ${text}`);
  } else if (ctx.callbackQuery) {
    logger.info(
      `User ${userIdentifier} sent message: [callback-query] ${ctx.callbackQuery.data}`,
    );
  } else if (ctx.update.my_chat_member?.new_chat_member.status === 'kicked') {
    logger.info(`User ${userIdentifier} block bot`);
  } else {
    try {
      const uniqueId = v4();

      {
        await ctx.api.sendMessage(
          envConfig.ADMIN_ID,
          `Message ID: \`${uniqueId}\``,
          {
            parse_mode: 'MarkdownV2',
          },
        );
        await ctx.copyMessage(envConfig.ADMIN_ID);

        logger.info(`User ${userIdentifier} sent non-message: [${uniqueId}]`);
      }
    } catch (err) {
      logger.error(
        `Unexpected error to copy message from ${userIdentifier}`,
        err,
      );
    }
  }
  await next();
};
