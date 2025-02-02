export const DAYS_OF_WEEK = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;

export const LESSONS = [
  'Английский язык',
  'Математика',
  'Русский язык',
  'Литература',
  'История',
  'Физика',
  'Химия',
  'Биология',
  'География',
];
export const CLASSES = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
] as const;
export const SUBCLASSES = ['А', 'Б', 'В', 'Г', 'СИЗО'] as const;

export const defaultFields = {
  dayOfWeek: 'MONDAY' as (typeof DAYS_OF_WEEK)[number],
  lesson: '',
  class: '' as (typeof CLASSES)[number],
  subclass: '',
  timeStart: '00:00',
  timeEnd: '00:00',
  classroom: '',
  canteen: false,
  lead: false,
};
