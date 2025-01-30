import { Paper, Typography, Box } from '@mui/material';
import { getMessages } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/config/next-auth';
import { prisma } from '@bot/utils/prisma-client';

export const Schedule = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return null;

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.user.id },
    select: { schedule: true },
  });
  if (!teacher) return null;

  const t = (await getMessages())['days-of-week'] as Record<string, string>;

  const daysOfWeek = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
  ];

  return (
    <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={2}>
      {daysOfWeek.map((day) => (
        <Paper elevation={3} key={day} style={{ height: '300px' }}>
          <Typography variant="h6" align="center">
            {t[day]}
          </Typography>
          {/* Здесь будут добавляться события */}
        </Paper>
      ))}
    </Box>
  );
};
