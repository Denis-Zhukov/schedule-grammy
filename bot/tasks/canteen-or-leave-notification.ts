import { envConfig } from '@/env-config';

export const canteenOrLeaveNotification = async () => {
  const chatId = envConfig.ADMIN_ID;

  if (!chatId) {
    throw new Error('ADMIN_CHAT_ID is not defined in environment variables');
  }
};
