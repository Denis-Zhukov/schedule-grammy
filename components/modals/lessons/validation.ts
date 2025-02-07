import { z } from 'zod';
import { CLASSES, DAYS_OF_WEEK } from './config';

export const addLessonSchema = z.object({
  dayOfWeek: z.enum(DAYS_OF_WEEK),
  lesson: z.string().nonempty(),
  class: z.enum(CLASSES),
  subclass: z.string().nonempty(),

  timeStart: z.string().nonempty(),
  timeEnd: z.string().nonempty(),

  classroom: z.string().nonempty(),

  canteen: z.boolean(),
  lead: z.boolean(),
});

export type AddLessonFields = z.infer<typeof addLessonSchema>;
