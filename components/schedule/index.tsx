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

  if (!data || !Array.isArray(data)) return null;

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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexGrow: 1,
        overflowX: 'auto',
        paddingX: 1,
        paddingY: 2,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 1,
          width: 'fit-content',
          minWidth: '100%',
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
          },
        }}
      >
        {daysOfWeek.map((day) => (
          <Paper
            key={day}
            elevation={3}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              padding: 1,
              width: '270px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              '&:hover': {
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
              },
              '@media (max-width: 768px)': {
                width: '100%',
              },
            }}
          >
            <Typography
              variant="h6"
              align="center"
              sx={{
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: 2,
              }}
            >
              {t(day)}
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              {scheduleByDay[day]?.length > 0 ? (
                scheduleByDay[day].map(
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
                )
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                  sx={{ paddingTop: 2 }}
                >
                  Нет занятий
                </Typography>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
