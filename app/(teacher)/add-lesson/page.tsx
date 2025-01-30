import { prisma } from '@bot/utils/prisma-client';
import { convertTimeToISO } from '@bot/utils/time/convert-time-to-iso';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/config/next-auth';

const addLesson = async (payload: FormData) => {
  'use server';

  const userSessison = await getServerSession(authOptions);
  if (!userSessison) return;

  const user = await prisma.user.findUnique({
    where: {
      id: +userSessison.user.id,
    },
    select: {
      teacher: { select: { id: true } },
    },
  });

  if (!user || !user.teacher?.id) return;

  await prisma.schedule.create({
    data: {
      dayOfWeek: 'MONDAY',
      lesson: payload.get('lesson') as string,
      class: 1,
      subclass: 'А',
      timeStart: convertTimeToISO('9:55'),
      timeEnd: convertTimeToISO('9:30'),
      classroom: '4-4',
      canteen: true,
      lead: true,
      teacherId: user.teacher.id,
    },
  });
};

const AddLessonPage = () => {
  return (
    <form action={addLesson}>
      <input type="text" name="lesson" />
    </form>
  );
};

export default AddLessonPage;
