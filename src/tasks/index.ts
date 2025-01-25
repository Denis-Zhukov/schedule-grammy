import { schedule } from 'node-cron';

import { clearLogs } from './clear-logs';
import { sendLogs } from './send-logs';
import { canteenOrLeaveNotification } from '@/tasks/canteen-or-leave-notification';
import { CustomBot } from '@/types';

export function registerCronTasks(bot: CustomBot) {
  schedule('0 0 * * *', async () => {
    await sendLogs(bot);
    await clearLogs();
  });

  schedule('* * * * *', async () => {
    await canteenOrLeaveNotification();
  });
}
