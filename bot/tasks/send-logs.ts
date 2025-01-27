import { InputFile } from 'grammy';

import { config } from '@bot/config';
import { logFilePath } from '@bot/constants/logs';
import { CustomBot } from '@bot/types';

export async function sendLogs(bot: CustomBot) {
  const chatId = config.ADMIN_ID;

  if (!chatId) {
    throw new Error('ADMIN_CHAT_ID is not defined in environment variables');
  }

  try {
    await bot.api.sendDocument(chatId, new InputFile(logFilePath), {
      caption: 'Daily logs',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to send logs:', error);
  }
}
