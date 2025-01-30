import { z } from 'zod';

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
export const SUBCLASSES = ['А', 'Б', 'В', 'Г', 'СИЗО'];

export const addLessonSchema = z.object({
  dayOfWeek: z.enum(DAYS_OF_WEEK),
  lesson: z.string().nonempty(),
  class: z.enum(CLASSES),
  subclass: z.string(),

  timeStart: z.string(),
  timeEnd: z.string(),

  classroom: z.string(),

  canteen: z.boolean(),
  lead: z.boolean(),
});

export type AddLessonFields = z.infer<typeof addLessonSchema>;
