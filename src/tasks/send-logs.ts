import { InputFile } from 'grammy';

import { bot } from '@/bot';
import { config } from '@/config';
import { logFilePath } from '@/constants/logs';

export async function sendLogs() {
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
