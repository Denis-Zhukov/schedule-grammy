'use client';

import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  MenuItem,
  Autocomplete,
  Select,
  IconButton,
  Paper,
} from '@mui/material';
import TimeField from 'react-simple-timefield';
import { useTranslations } from 'next-intl';
import { useForm, Controller, useWatch, UseFormReset } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';

import {
  CLASSES,
  DAYS_OF_WEEK,
  defaultFields,
  LESSONS,
  SUBCLASSES,
} from './config';
import { addLessonSchema, type AddLessonFields } from '../validation';
import { useEffect } from 'react';

interface LessonFormProps {
  initialValues?: Partial<AddLessonFields>;
  onSubmit: (
    reset: UseFormReset<AddLessonFields>,
  ) => (data: AddLessonFields) => void;
  isPending?: boolean;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}

export const LessonForm = ({
  initialValues,
  onSubmit,
  onClose,
  isPending,
  t,
}: LessonFormProps) => {
  const tDaysOfWeek = useTranslations('days-of-week');

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddLessonFields>({
    resolver: zodResolver(addLessonSchema),
    defaultValues: defaultFields,
    mode: 'all',
  });

  useEffect(() => {
    reset((prev) => ({
      ...prev,
      ...initialValues,
    }));
  }, [reset, initialValues]);

  const [lesson, className, subclass, timeStart, timeEnd] = useWatch({
    control,
    name: ['lesson', 'class', 'subclass', 'timeStart', 'timeEnd'],
  });

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        p: 3,
        borderRadius: 4,
        maxWidth: 480,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', right: 16, top: 16 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: 2 }}
      >
        {t('title')}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit(reset))}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Controller
          control={control}
          name="dayOfWeek"
          render={({ field }) => (
            <Select {...field} error={!!errors.dayOfWeek} fullWidth>
              {DAYS_OF_WEEK.map((day) => (
                <MenuItem key={day} value={day}>
                  {tDaysOfWeek(day)}
                </MenuItem>
              ))}
            </Select>
          )}
        />

        <Autocomplete
          {...register('lesson')}
          value={lesson}
          onChange={(_, newValue) => setValue('lesson', newValue!)}
          options={LESSONS}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => setValue('lesson', e.target.value)}
              label={t('lesson')}
              error={!!errors.lesson}
            />
          )}
          freeSolo
        />

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Autocomplete
            {...register('class')}
            value={String(className ?? '')}
            options={CLASSES}
            sx={{ width: '30%' }}
            onChange={(_, newValue) =>
              setValue('class', newValue as (typeof CLASSES)[number])
            }
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) =>
                  setValue('class', e.target.value as (typeof CLASSES)[number])
                }
                value={String(className ?? '')}
                label={t('class')}
                error={!!errors.class}
              />
            )}
            freeSolo
          />
          <Autocomplete
            {...register('subclass')}
            value={subclass}
            options={SUBCLASSES}
            sx={{ width: '70%' }}
            onChange={(_, newValue) => setValue('subclass', newValue!)}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => setValue('subclass', e.target.value)}
                label={t('subclass')}
                error={!!errors.subclass}
              />
            )}
            freeSolo
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <TimeField
            {...register('timeStart')}
            value={timeStart}
            input={<TextField label={t('timeStart')} fullWidth />}
            onChange={(_, value) => setValue('timeStart', value)}
          />
          <TimeField
            {...register('timeEnd')}
            value={timeEnd}
            input={<TextField label={t('timeEnd')} fullWidth />}
            onChange={(_, value) => setValue('timeEnd', value)}
          />
        </Box>

        <TextField
          {...register('classroom')}
          label={t('classroom')}
          error={!!errors.classroom}
          fullWidth
        />

        <Box>
          <Controller
            control={control}
            name="canteen"
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox checked={field.value} />}
                label={t('canteen')}
              />
            )}
          />
          <Controller
            control={control}
            name="lead"
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox checked={field.value} />}
                label={t('lead')}
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={onClose} fullWidth>
            {t('close')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            loading={isPending}
            fullWidth
          >
            {t('add')}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
