'use client';

import { Paper, Typography, Box } from '@mui/material';
import { useGetSchedule } from '@/components/schedule/quries';
import { useTranslations } from 'next-intl';
import { Schedule as ScheduleData } from '@prisma/client';
import { format, toZonedTime } from 'date-fns-tz';

export const Schedule = () => {
  const { data } = useGetSchedule();
  const t = useTranslations('days-of-week');

  if (!data) return null;

  const daysOfWeek = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];

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
            {scheduleByDay[day]?.map((lesson, index) => (
              <Box key={index} mb={2}>
                <Typography variant="body1">
                  <strong>Lesson:</strong> {lesson.lesson}
                </Typography>
                <Typography variant="body1">
                  <strong>Class:</strong> {lesson.class}
                </Typography>
                <Typography variant="body1">
                  <strong>Subclass:</strong> {lesson.subclass}
                </Typography>
                <Typography variant="body1">
                  <strong>Start Time:</strong>{' '}
                  {format(toZonedTime(lesson.timeStart, 'UTC'), 'HH:mm')}
                </Typography>
                <Typography variant="body1">
                  <strong>End Time:</strong>{' '}
                  {format(toZonedTime(lesson.timeEnd, 'UTC'), 'HH:mm')}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};
