import { Box, Paper, Skeleton } from '@mui/material';
import { DAYS_OF_WEEK } from './config';

export const SkeletonSchedule = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
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
        flexGrow: 1,
        width: 'fit-content',
        minWidth: '100%',
        '@media (max-width: 768px)': {
          gridTemplateColumns: 'repeat(1, 1fr)',
        },
      }}
    >
      {DAYS_OF_WEEK.map((day) => (
        <Paper key={day} elevation={3} sx={{ padding: 1 }}>
          <Skeleton
            variant="text"
            width={150}
            height={30}
            sx={{ margin: '0 auto' }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ marginTop: 2 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ marginTop: 1 }}
          />
        </Paper>
      ))}
    </Box>
  </Box>
);
