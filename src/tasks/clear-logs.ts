import { writeFile } from 'fs/promises';

import { logFilePath } from '@/constants/logs';

export async function clearLogs() {
  try {
    await writeFile(logFilePath, '');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to clear logs:', error);
  }
}
