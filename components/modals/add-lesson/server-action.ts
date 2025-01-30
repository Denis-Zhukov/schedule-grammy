'use server';
import { AddLessonFields, addLessonSchema } from './config';
import { prisma } from '@bot/utils/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { convertTimeToISO } from '@bot/utils/time/convert-time-to-iso';

export const addLesson = async (payload: AddLessonFields) => {
  try {
    const validation = await addLessonSchema.safeParseAsync(payload);
    if (!validation.success) return;

    const user = await getServerSession(authOptions);
    if (!user) return null;

    const teacher = await prisma.teacher.findUnique({
      where: { userId: user.user.id },
      select: { id: true },
    });
    if (!teacher) return null;

    const timeStartISO = convertTimeToISO(payload.timeStart);
    const timeEndISO = convertTimeToISO(payload.timeEnd);

    if (timeStartISO >= timeEndISO)
      return { isError: true, error: 'TIME_ERROR' };

    const existingLesson = await prisma.schedule.findFirst({
      where: {
        teacherId: teacher.id,
        dayOfWeek: payload.dayOfWeek,
        OR: [
          {
            AND: [
              { timeStart: { lte: timeStartISO } },
              { timeEnd: { gt: timeStartISO } },
            ],
          },
          {
            AND: [
              { timeStart: { lt: timeEndISO } },
              { timeEnd: { gte: timeEndISO } },
            ],
          },
          {
            AND: [
              { timeStart: { gte: timeStartISO } },
              { timeEnd: { lte: timeEndISO } },
            ],
          },
        ],
      },
    });

    if (existingLesson) {
      return { isError: true, error: 'TIME_SLOT_OCCUPIED' };
    }
    await prisma.schedule.create({
      data: {
        dayOfWeek: payload.dayOfWeek,
        lesson: payload.lesson,
        class: +payload.class,
        subclass: payload.subclass,
        classroom: payload.classroom,
        canteen: payload.canteen,
        lead: payload.lead,
        timeStart: timeStartISO,
        timeEnd: timeEndISO,
        teacherId: teacher.id,
      },
    });

    return { isSuccess: true };
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      typeof error.code === 'string'
    ) {
      return { isError: true, error: error.code };
    }
    return { isError: true };
  }
};
