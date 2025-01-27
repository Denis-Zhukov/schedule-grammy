import * as fs from 'fs/promises';

import { logFilePath } from '@bot/constants/logs';

export async function clearLogs() {
  try {
    await fs.writeFile(logFilePath, '');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to clear logs:', error);
  }
}
