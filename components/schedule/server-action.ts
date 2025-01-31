'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { prisma } from '@bot/utils/prisma-client';

export const getSchedule = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return null;

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.user.id },
    select: { id: true },
  });
  if (!teacher) return null;

  return prisma.schedule.findMany({
    where: { teacherId: teacher.id },
    orderBy: { timeStart: 'asc' },
  });
};

export const deleteSchedule = async (scheduleId: string) => {
  const user = await getServerSession(authOptions);
  if (!user) return { isError: true };

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.user.id },
    select: { id: true },
  });
  if (!teacher) return { isError: true };

  await prisma.schedule.deleteMany({
    where: {
      id: scheduleId,
      teacherId: teacher.id,
    },
  });
  return { isSuccess: true };
};
