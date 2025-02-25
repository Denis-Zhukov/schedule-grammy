'use server';
import { AddLessonFields, addLessonSchema } from '../validation';
import { prisma } from '@bot/utils/prisma-client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { convertTimeToISO } from '@bot/utils/time/convert-time-to-iso';
import { DayOfWeek, Schedule } from '@prisma/client';

export type FetchLessonByIdReturnType =
  | Schedule
  | {
      isError: boolean;
      error?: string;
    };

export const fetchLessonById = async (
  lessonId: string | null,
): Promise<FetchLessonByIdReturnType> => {
  try {
    const user = await getServerSession(authOptions);
    if (!user) return { isError: true, error: 'UNAUTH' };

    if (!lessonId) return { isError: true };

    const lesson = await prisma.schedule.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        teacher: true,
      },
    });

    if (!lesson) return { isError: true, error: 'LESSON_NOT_FOUND' };

    if (lesson.teacher.userId !== BigInt(user.user.id))
      return { isError: true, error: 'FORBIDDEN' };

    return lesson;
  } catch {
    return { isError: true, error: 'UNEXPECTED_ERROR' };
  }
};

export type UpdateLessonReturnType =
  | {
      isError: boolean;
      error?: string;
    }
  | { isSuccess: true };

export const updateLesson = async (
  payload: AddLessonFields & {
    lessonId: string;
  },
): Promise<UpdateLessonReturnType> => {
  try {
    const validation = await addLessonSchema.safeParseAsync(payload);
    if (!validation.success) return { isError: true };

    const user = await getServerSession(authOptions);
    if (!user) return { isError: true, error: 'UNAUTH' };

    const teacher = await prisma.teacher.findUnique({
      where: { userId: user.user.id },
      select: { id: true },
    });
    if (!teacher) return { isError: true, error: 'UNAUTH' };

    const timeStartISO = convertTimeToISO(payload.timeStart as string);
    const timeEndISO = convertTimeToISO(payload.timeEnd as string);

    if (timeStartISO >= timeEndISO)
      return { isError: true, error: 'TIME_ERROR' };

    const existingLesson = await prisma.schedule.findFirst({
      where: {
        teacherId: teacher.id,
        dayOfWeek: payload.dayOfWeek as DayOfWeek,
        AND: [
          { timeStart: { lt: timeEndISO } },
          { timeEnd: { gt: timeStartISO } },
        ],
      },
    });

    if (existingLesson && existingLesson.id !== payload.lessonId) {
      return { isError: true, error: 'TIME_SLOT_OCCUPIED' };
    }

    await prisma.schedule.update({
      where: { id: payload.lessonId },
      data: {
        dayOfWeek: payload.dayOfWeek as DayOfWeek,
        lesson: payload.lesson as string,
        class: +(payload.class as string),
        subclass: payload.subclass as string,
        classroom: payload.classroom as string,
        canteen: payload.canteen as boolean,
        lead: payload.lead as boolean,
        timeStart: timeStartISO,
        timeEnd: timeEndISO,
      },
    });

    return { isSuccess: true };
  } catch {
    return { isError: true, error: 'UNEXPECTED_ERROR' };
  }
};
