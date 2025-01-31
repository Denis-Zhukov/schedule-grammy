'use client';

import { Paper, Typography, Box } from '@mui/material';
import { useDeleteLesson, useGetSchedule } from '@/components/schedule/quries';
import { useTranslations } from 'next-intl';
import { Schedule as ScheduleData } from '@prisma/client';
import { Lesson } from '@/components/lesson';

const daysOfWeek = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

export const Schedule = () => {
  const t = useTranslations('days-of-week');
  const { data } = useGetSchedule();
  const { mutate: deleteLesson } = useDeleteLesson();

  if (!data) return null;

  const onDelete = (scheduleId: string) => () => {
    deleteLesson(scheduleId);
  };

  const scheduleByDay = daysOfWeek.reduce(
    (acc, day) => {
      acc[day] = [];
      return acc;
    },
    {} as Record<string, ScheduleData[]>,
  );

  data.forEach((lesson) => {
    const day = lesson.dayOfWeek;
    scheduleByDay[day].push(lesson);
  });

  return (
    <Box display="grid" gridTemplateColumns="repeat(6, 1fr)">
      {daysOfWeek.map((day) => (
        <Paper elevation={3} key={day}>
          <Typography variant="h6" align="center">
            {t(day)}
          </Typography>
          <Box padding={2}>
            {scheduleByDay[day]?.map(
              ({
                id,
                lesson,
                class: className,
                subclass,
                timeStart,
                timeEnd,
              }) => (
                <Lesson
                  onDelete={onDelete(id)}
                  onEdit={() => {}}
                  key={id}
                  lesson={lesson}
                  className={className}
                  subclass={subclass}
                  timeStart={timeStart}
                  timeEnd={timeEnd}
                />
              ),
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
