import { schedule } from 'node-cron';

import { clearLogs } from './clear-logs';
import { sendLogs } from './send-logs';
import { canteenOrLeaveNotification } from '@bot/tasks/canteen-or-leave-notification';
import { CustomBot } from '@bot/types';

export function registerCronTasks(bot: CustomBot) {
  schedule('0 0 * * *', async () => {
    await sendLogs(bot);
    await clearLogs();
  });

  schedule('*/5 * * * *', async () => {
    await canteenOrLeaveNotification(bot);
  });
}
