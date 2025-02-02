'use client';

import { Paper, Typography, Box } from '@mui/material';
import { useDeleteLesson, useGetSchedule } from '@/components/schedule/quries';
import { useTranslations } from 'next-intl';
import { Schedule as ScheduleData } from '@prisma/client';
import { Lesson } from '@/components/lesson';
import { SkeletonSchedule } from '@/components/schedule/skeleton';
import { DAYS_OF_WEEK } from './config';

export const Schedule = () => {
  const tDaysOfWeek = useTranslations('days-of-week');
  const t = useTranslations('schedule');

  const { data, isLoading } = useGetSchedule();
  const { mutate: deleteLesson } = useDeleteLesson();

  if (isLoading || !data || !Array.isArray(data)) {
    return <SkeletonSchedule />;
  }

  const onDelete = (scheduleId: string) => () => {
    deleteLesson(scheduleId);
  };

  const scheduleByDay = DAYS_OF_WEEK.reduce(
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
        overflowX: 'auto',
        paddingX: 1,
        paddingY: 2,
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          gap: 2,
          minWidth: '100%',
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
          },
        }}
      >
        {DAYS_OF_WEEK.map((day) => (
          <Paper
            key={day}
            elevation={3}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              padding: 1,
              minWidth: '270px',
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
              {tDaysOfWeek(day)}
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
                      onEdit={() =>
                        alert('Ещё не реализовано, будет добавлено позже')
                      }
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
                  sx={{ paddingBottom: 2 }}
                >
                  {t('no-class')}
                </Typography>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
