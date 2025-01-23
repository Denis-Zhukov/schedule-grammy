import { schedule } from 'node-cron';

import { clearLogs } from './clear-logs';
import { sendLogs } from './send-logs';

export function registerTasks() {
  schedule('0 0 * * *', async () => {
    await sendLogs();
    await clearLogs();
  });
}
