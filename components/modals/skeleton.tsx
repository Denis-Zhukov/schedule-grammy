import { Box, Modal, Skeleton } from '@mui/material';

export const SkeletonModal = () => (
  <Modal open={true}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        sx={{
          maxWidth: 480,
          width: '100%',
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
        }}
      >
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ my: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ my: 1 }}
        />
        <Skeleton variant="text" width="40%" height={30} sx={{ mt: 2 }} />
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ my: 1 }}
        />
      </Box>
    </Box>
  </Modal>
);
