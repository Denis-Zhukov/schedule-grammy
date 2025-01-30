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
} from '@mui/material';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
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
import { format } from 'date-fns-tz';
import { isDate } from 'date-fns';
import { useAddLesson } from '@/components/modals/add-lesson/quries';

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

  const { mutate, isSuccess, error } = useAddLesson();

  const onSubmit = handleSubmit((val) => {
    mutate(val);
  });

  if (isSuccess) console.log('success');
  if (error) console.log(error);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 400,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {t('add-lesson-modal.title')}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box
            onSubmit={onSubmit}
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Controller
              control={control}
              name="dayOfWeek"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={onChange}
                  label={t('add-lesson-modal.days-of-week')}
                  required
                  error={!!errors.dayOfWeek}
                >
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
                  {...register('lesson')}
                  label={t('add-lesson-modal.lesson')}
                  required
                  error={!!errors.lesson}
                />
              )}
              freeSolo
            />

            <Autocomplete
              options={CLASSES}
              onChange={(_, newValue) =>
                setValue('class', newValue as (typeof CLASSES)[number])
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...register('class')}
                  label={t('add-lesson-modal.class')}
                  required
                  error={!!errors.class}
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
                  {...register('subclass')}
                  label={t('add-lesson-modal.subclass')}
                  required
                  error={!!errors.subclass}
                />
              )}
              freeSolo
            />

            <Controller
              control={control}
              name="timeStart"
              render={({ field: { onBlur, name } }) => (
                <TimeField
                  label={t('add-lesson-modal.timeStart')}
                  format="HH:mm"
                  required
                  onBlur={onBlur}
                  onChange={(date) => {
                    if (!isDate(date)) return;
                    setValue(name, format(date, 'HH:mm'));
                  }}
                  slotProps={{
                    textField: {
                      error: !!errors.timeStart,
                    },
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="timeEnd"
              render={({ field: { onBlur, name } }) => (
                <TimeField
                  label={t('add-lesson-modal.timeEnd')}
                  format="HH:mm"
                  required
                  onBlur={onBlur}
                  onChange={(date) => {
                    if (!isDate(date)) return;
                    setValue(name, format(date, 'HH:mm'));
                  }}
                  slotProps={{
                    textField: {
                      error: !!errors.timeEnd,
                    },
                  }}
                />
              )}
            />

            <TextField
              {...register('classroom')}
              label={t('add-lesson-modal.classroom')}
              required
            />

            <Controller
              control={control}
              name="canteen"
              render={({ field: { value, name } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value}
                      onChange={(e) => setValue(name, e.target.checked)}
                    />
                  }
                  label={t('add-lesson-modal.canteen')}
                />
              )}
            />

            <Controller
              control={control}
              name="lead"
              render={({ field: { value, name } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={value}
                      onChange={(e) => setValue(name, e.target.checked)}
                    />
                  }
                  label={t('add-lesson-modal.lead')}
                />
              )}
            />

            <Button type="submit" variant="contained" color="primary">
              {t('add-lesson-modal.save')}
            </Button>
          </Box>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
};
