import React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  Box,
  Chip,
} from '@mui/material';
import { format, toZonedTime } from 'date-fns-tz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDeleteLesson } from '@/components/schedule/quries';

type LessonProps = {
  id: string;
  lesson: string;
  className: number;
  subclass: string;
  timeStart: Date;
  timeEnd: Date;
  onEdit: VoidFunction;
};

export const Lesson = ({
  id,
  timeStart,
  timeEnd,
  className,
  subclass,
  lesson,
  onEdit,
}: LessonProps) => {
  const { mutate: deleteLesson, isPending } = useDeleteLesson();

  const onDelete = () => deleteLesson(id);

  return (
    <Card
      sx={{
        m: 1,
        position: 'relative',
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 2,
          right: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <IconButton onClick={onDelete} loading={isPending} color="error">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={onEdit} color="primary">
          <EditIcon />
        </IconButton>
      </Box>

      <CardContent>
        <Tooltip title={lesson} arrow>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{
              fontWeight: 'bold',
              color: '#333',
              maxWidth: '100%',
              mb: 1,
              fontSize: 18,
              paddingRight: '16px',
              '@media (max-width: 333px)': {
                mb: 0,
                fontSize: 16,
                paddingRight: 0,
              },
            }}
          >
            {lesson}
          </Typography>
        </Tooltip>
        <Chip
          label={`${className} ${subclass}`}
          color="primary"
          size="small"
          sx={{ mb: 1 }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 0.5,
            fontSize: 14,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
            {format(toZonedTime(timeStart, 'UTC'), 'HH:mm')} -{' '}
            {format(toZonedTime(timeEnd, 'UTC'), 'HH:mm')}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};
