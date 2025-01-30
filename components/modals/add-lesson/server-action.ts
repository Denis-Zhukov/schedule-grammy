'use server';
import { AddLessonFields, addLessonSchema } from './config';
import { prisma } from '@bot/utils/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { convertTimeToISO } from '@bot/utils/time/convert-time-to-iso';

export const addLesson = async (payload: AddLessonFields) => {
  const data = await addLessonSchema.safeParseAsync(payload);
  if (!data.success) return;

  const user = await getServerSession(authOptions);
  if (!user) return null;

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.user.id },
    select: { id: true },
  });
  if (!teacher) return null;

  await prisma.schedule.create({
    data: {
      dayOfWeek: payload.dayOfWeek,
      lesson: payload.lesson,
      class: +payload.class,
      subclass: payload.subclass,
      classroom: payload.classroom,
      canteen: payload.canteen,
      lead: payload.lead,
      timeStart: convertTimeToISO(payload.timeStart),
      timeEnd: convertTimeToISO(payload.timeEnd),
      teacherId: teacher.id,
    },
  });
};
