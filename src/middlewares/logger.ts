import { MiddlewareFn } from 'grammy';
import { v4 } from 'uuid';

import { config } from '@/config';
import { logger } from '@/utils/logger';

export const loggerMiddleware: MiddlewareFn = async (ctx, next) => {
  const { username, id } = ctx.from ?? {};

  const { text } = ctx.message ?? {};

  const userIdentifier = username ? `@${username}(${id})` : `${id}`;

  if (text) {
    logger.info(`User ${userIdentifier} sent message: ${text}`);
  } else {
    const uniqueId = v4();

    await ctx.api.sendMessage(config.ADMIN_ID, `Message ID: \`${uniqueId}\``, {
      parse_mode: 'MarkdownV2',
    });
    await ctx.copyMessage(config.ADMIN_ID);

    logger.info(`User ${userIdentifier} sent message: [${uniqueId}]`);
  }
  await next();
};
