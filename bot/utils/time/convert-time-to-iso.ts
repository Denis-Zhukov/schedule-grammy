import { formatISO } from 'date-fns';

export const convertTimeToISO = (time: string) => {
  const currentDate = new Date();
  const [hours, minutes] = time.split(':').map(Number);

  currentDate.setHours(hours, minutes, 0, 0);
  return formatISO(currentDate);
};
