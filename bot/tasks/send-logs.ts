import { InputFile } from 'grammy';

import { envConfig } from '@/env-config';
import { logFilePath } from '@bot/constants/logs';
import { CustomBot } from '@bot/types';

export async function sendLogs(bot: CustomBot) {
  const chatId = envConfig.ADMIN_ID;

  if (!chatId) {
    throw new Error('ADMIN_CHAT_ID is not defined in environment variables');
  }

  try {
    await bot.api.sendDocument(chatId, new InputFile(logFilePath), {
      caption: 'Daily logs',
    });
  } catch (error) {
    console.error('Failed to send logs:', error);
  }
}
