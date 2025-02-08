import { z } from 'zod';
import { CLASSES, DAYS_OF_WEEK } from './config';

export const addLessonSchema = z.object({
  dayOfWeek: z.enum(DAYS_OF_WEEK),
  lesson: z.string().min(2).max(100),
  class: z.enum(CLASSES),
  subclass: z.string().min(1).max(50),

  timeStart: z.string().min(5).max(5),
  timeEnd: z.string().min(5).max(5),

  classroom: z.string().min(1).max(50),

  canteen: z.boolean(),
  lead: z.boolean(),
});

export type AddLessonFields = z.infer<typeof addLessonSchema>;
