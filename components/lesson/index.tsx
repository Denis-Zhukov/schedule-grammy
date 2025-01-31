import React from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  Box,
} from '@mui/material';
import { format, toZonedTime } from 'date-fns-tz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type LessonProps = {
  lesson: string;
  className: number;
  subclass: string;
  timeStart: Date;
  timeEnd: Date;
  onDelete: VoidFunction;
  onEdit: VoidFunction;
};

export const Lesson = ({
  timeStart,
  timeEnd,
  className,
  subclass,
  lesson,
  onDelete,
  onEdit,
}: LessonProps) => {
  return (
    <Card
      sx={{
        maxWidth: 320,
        m: 1,
        p: 2,
        position: 'relative',
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}
      >
        <IconButton onClick={onEdit} color="primary" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} color="error" aria-label="delete">
          <DeleteIcon />
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
            }}
          >
            {lesson}
          </Typography>
        </Tooltip>
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {className} {subclass}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontSize: 14 }}
        >
          {format(toZonedTime(timeStart, 'UTC'), 'HH:mm')} -{' '}
          {format(toZonedTime(timeEnd, 'UTC'), 'HH:mm')}
        </Typography>
      </CardContent>
    </Card>
  );
};
