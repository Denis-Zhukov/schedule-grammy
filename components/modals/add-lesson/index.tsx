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
} from '@mui/material';
import TimeField from 'react-simple-timefield';
import {
  CLASSES,
  DAYS_OF_WEEK,
  defaultFields,
  LESSONS,
  SUBCLASSES,
} from './config';
import { addLessonSchema, type AddLessonFields } from './validation';
import { useTranslations } from 'next-intl';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import { useSendLessonMutation } from './quries';

export type AddLessonModalProps = {
  open: boolean;
  handleClose: VoidFunction;
};

export const AddLessonModal = ({ open, handleClose }: AddLessonModalProps) => {
  const t = useTranslations('add-lesson-modal');
  const tDaysOfWeek = useTranslations('days-of-week');

  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddLessonFields>({
    resolver: zodResolver(addLessonSchema),
    defaultValues: defaultFields,
    mode: 'all',
  });

  const { mutate, isPending } = useSendLessonMutation(reset);

  const onSubmit = handleSubmit(async (fields) => {
    mutate(fields);
  });

  const [className, subclass, timeStart, timeEnd] = useWatch({
    control,
    name: ['class', 'subclass', 'timeStart', 'timeEnd'],
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
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
            onClick={handleClose}
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
            onSubmit={onSubmit}
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
              options={LESSONS}
              onChange={(_, newValue) => setValue('lesson', newValue!)}
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
                value={className}
                sx={{ width: '30%' }}
                options={CLASSES}
                onChange={(_, newValue) =>
                  setValue('class', newValue as (typeof CLASSES)[number])
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e) =>
                      setValue(
                        'class',
                        e.target.value as (typeof CLASSES)[number],
                      )
                    }
                    label={t('class')}
                    error={!!errors.class}
                  />
                )}
                freeSolo
              />

              <Autocomplete
                {...register('subclass')}
                value={subclass}
                sx={{ width: '70%' }}
                options={SUBCLASSES}
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
                render={({ field: { name, value, onChange } }) => (
                  <FormControlLabel
                    checked={value}
                    name={name}
                    control={<Checkbox onChange={onChange} />}
                    label={t('canteen')}
                  />
                )}
              />

              <Controller
                control={control}
                name="lead"
                render={({ field: { name, value, onChange } }) => (
                  <FormControlLabel
                    checked={value}
                    name={name}
                    control={<Checkbox onChange={onChange} />}
                    label={t('lead')}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClose}
                fullWidth
              >
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
      </Box>
    </Modal>
  );
};
