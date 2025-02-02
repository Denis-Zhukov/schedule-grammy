import { format, toZonedTime } from 'date-fns-tz';
import winston from 'winston';

import { datetimeFormat, logFilePath } from '@bot/constants/logs';
import { timezone } from '@bot/constants/time';

export const logger = winston.createLogger({
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
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: logFilePath,
      format: winston.format.uncolorize(),
    }),
  ],
});
