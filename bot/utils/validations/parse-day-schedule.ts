import { z } from 'zod';

const timeRegex = /^([0-9]|[0-1][0-9]|2[0-3]):[0-5][0-9]$/;

export const scheduleSchema = z.array(
  z.object({
    dayOfWeek: z.enum([
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
    ]),
    lesson: z.string().min(1, 'Lesson name is required'),
    class: z.number().int().positive('Class must be a positive integer'),
    subclass: z.string().optional(),
    timeStart: z
      .string()
      .regex(timeRegex, 'timeStart must be in the format h:mm or hh:mm'),
    timeEnd: z
      .string()
      .regex(timeRegex, 'timeEnd must be in the format h:mm or hh:mm'),
    classroom: z.string().min(1, 'Classroom is required'),
    canteen: z.boolean().optional(),
    lead: z.boolean().optional(),
  }),
);
