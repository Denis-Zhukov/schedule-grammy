import { format, toZonedTime } from 'date-fns-tz';
import { MiddlewareFn } from 'grammy';
import { v4 } from 'uuid';
import winston from 'winston';

import { config } from '@/config';
import { datetimeFormat, logFilePath } from '@/constants/logs';
import { timezone } from '@/constants/time';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ level: true }),
    winston.format.timestamp({
      format: () => {
        const zonedDate = toZonedTime(new Date(), timezone);
        return format(zonedDate, datetimeFormat);
      },
    }),
    winston.format.align(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logFilePath,
      format: winston.format.uncolorize(),
    }),
  ],
});

const loggerMiddleware: MiddlewareFn = async (ctx, next) => {
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

export default loggerMiddleware;
