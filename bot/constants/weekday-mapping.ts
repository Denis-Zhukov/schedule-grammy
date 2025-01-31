export const weekdayMapping = {
  ПН: 'MONDAY',
  ВТ: 'TUESDAY',
  СР: 'WEDNESDAY',
  ЧТ: 'THURSDAY',
  ПТ: 'FRIDAY',
  СБ: 'SATURDAY',
  Mon: 'MONDAY',
  Tue: 'TUESDAY',
  Wed: 'WEDNESDAY',
  Thu: 'THURSDAY',
  Fri: 'FRIDAY',
  Sat: 'SATURDAY',
} as const;

export const getWeekday = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
};
