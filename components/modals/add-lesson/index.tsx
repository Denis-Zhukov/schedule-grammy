'use client';

import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Modal,
  Typography,
  MenuItem,
  Autocomplete,
  Select,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import TimeField from 'react-simple-timefield';
import {
  AddLessonFields,
  addLessonSchema,
  CLASSES,
  DAYS_OF_WEEK,
  LESSONS,
  SUBCLASSES,
} from './config';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddLesson } from '@/components/modals/add-lesson/quries';
import CloseIcon from '@mui/icons-material/Close';

export type AddLessonModalProps = {
  open: boolean;
  handleClose: VoidFunction;
};

export const AddLessonModal = ({ open, handleClose }: AddLessonModalProps) => {
  const t = useTranslations();
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLessonFields>({
    resolver: zodResolver(addLessonSchema),
    defaultValues: {
      dayOfWeek: 'MONDAY',
      subclass: '',
      canteen: false,
      lead: false,
    },
    mode: 'all',
  });

  const { mutate } = useAddLesson();

  const onSubmit = handleSubmit(async (fields) => {
    mutate(fields);
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 2,
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Paper
          elevation={10}
          sx={{
            position: 'relative',
            p: 4,
            borderRadius: 4,
            width: 480,
            maxWidth: '95%',
            bgcolor: 'background.default',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            {t('add-lesson-modal.title')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Controller
              control={control}
              name="dayOfWeek"
              render={({ field }) => (
                <Select {...field} error={!!errors.dayOfWeek} fullWidth>
                  {DAYS_OF_WEEK.map((day) => (
                    <MenuItem key={day} value={day}>
                      {t(`days-of-week.${day}`)}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <Autocomplete
              options={LESSONS}
              onChange={(_, newValue) => setValue('lesson', newValue!)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('add-lesson-modal.lesson')}
                  error={!!errors.lesson}
                  fullWidth
                />
              )}
              freeSolo
            />

            <Autocomplete
              options={CLASSES}
              onChange={(_, newValue) => setValue('class', newValue!)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('add-lesson-modal.class')}
                  error={!!errors.class}
                  fullWidth
                />
              )}
              freeSolo
            />

            <Autocomplete
              options={SUBCLASSES}
              onChange={(_, newValue) => setValue('subclass', newValue!)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('add-lesson-modal.subclass')}
                  error={!!errors.subclass}
                  fullWidth
                />
              )}
              freeSolo
            />

            <Controller
              control={control}
              name="timeStart"
              render={({ field: { name } }) => (
                <TimeField
                  input={
                    <TextField
                      label={t('add-lesson-modal.timeStart')}
                      fullWidth
                    />
                  }
                  onChange={(_, value) => setValue(name, value)}
                />
              )}
            />

            <Controller
              control={control}
              name="timeEnd"
              render={({ field: { name } }) => (
                <TimeField
                  input={
                    <TextField
                      label={t('add-lesson-modal.timeEnd')}
                      fullWidth
                    />
                  }
                  onChange={(_, value) => setValue(name, value)}
                />
              )}
            />

            <TextField
              {...register('classroom')}
              label={t('add-lesson-modal.classroom')}
              error={!!errors.classroom}
              fullWidth
            />

            <Box>
              <FormControlLabel
                control={<Checkbox {...register('canteen')} />}
                label={t('add-lesson-modal.canteen')}
              />
              <FormControlLabel
                control={<Checkbox {...register('lead')} />}
                label={t('add-lesson-modal.lead')}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClose}
                fullWidth
              >
                {t('add-lesson-modal.close')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {t('add-lesson-modal.add')}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};
