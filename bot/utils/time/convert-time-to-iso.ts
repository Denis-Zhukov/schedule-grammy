import { toZonedTime } from 'date-fns-tz';
import { timezone } from '@bot/constants/time';

export const convertTimeToISO = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  const localDate = new Date(1970, 0, 1, hours, minutes);

  return toZonedTime(localDate, timezone);
};
