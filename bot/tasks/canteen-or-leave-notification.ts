import { config } from '@/config';

export const canteenOrLeaveNotification = async () => {
  const chatId = config.ADMIN_ID;

  if (!chatId) {
    throw new Error('ADMIN_CHAT_ID is not defined in environment variables');
  }
};
