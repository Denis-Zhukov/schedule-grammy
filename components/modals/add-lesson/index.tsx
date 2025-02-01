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
import CloseIcon from '@mui/icons-material/Close';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLesson } from '@/components/modals/add-lesson/server-action';
import { toast } from 'react-toastify';

export type AddLessonModalProps = {
  open: boolean;
  handleClose: VoidFunction;
};

export const AddLessonModal = ({ open, handleClose }: AddLessonModalProps) => {
  const t = useTranslations();
  const tErrors = useTranslations('add-lesson-modal.errors');

  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddLessonFields>({
    resolver: zodResolver(addLessonSchema),
    defaultValues: {
      lesson: '',
      class: '' as (typeof CLASSES)[number],
      dayOfWeek: 'MONDAY',
      subclass: '',
      canteen: false,
      lead: false,
      timeStart: '00:00',
      timeEnd: '00:00',
    },
    mode: 'all',
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addLesson,
    onSuccess: (data) => {
      if (!data) return;
      if (data.isSuccess) {
        toast('Урок добавлен', { type: 'success' });
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
        reset((fields) => ({
          ...fields,
          class: '' as (typeof CLASSES)[number],
          subclass: '',
          canteen: false,
          lead: false,
          timeStart: '00:00',
          timeEnd: '00:00',
          classroom: '',
        }));
      }
      if (data.isError && data.error) {
        toast(tErrors(data.error), { type: 'error' });
      } else if (data.isError) {
        toast(tErrors('unexpected'), { type: 'error' });
      }
    },
    mutationKey: ['schedule'],
  });

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
          elevation={5}
          sx={{
            position: 'relative',
            p: 3,
            borderRadius: 4,
            width: 480,
            maxWidth: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
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
                      {t(`days-of-week.${day}`)}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              control={control}
              name="lesson"
              render={({ field: { value } }) => (
                <Autocomplete
                  value={value}
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
              )}
            />

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Controller
                control={control}
                name="class"
                render={({ field: { value } }) => (
                  <Autocomplete
                    sx={{ width: '25%' }}
                    value={value}
                    options={CLASSES}
                    onChange={(_, newValue) =>
                      setValue('class', newValue! as (typeof CLASSES)[number])
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t('add-lesson-modal.class')}
                        error={!!errors.class}
                      />
                    )}
                    freeSolo
                  />
                )}
              />

              <Controller
                control={control}
                name="subclass"
                render={({ field: { value } }) => (
                  <Autocomplete
                    sx={{ width: '100%' }}
                    value={value}
                    options={SUBCLASSES}
                    onChange={(_, newValue) => setValue('subclass', newValue!)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t('add-lesson-modal.subclass')}
                        error={!!errors.subclass}
                      />
                    )}
                    freeSolo
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Controller
                control={control}
                name="timeStart"
                render={({ field: { name, value } }) => (
                  <TimeField
                    value={value}
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
                render={({ field: { name, value } }) => (
                  <TimeField
                    value={value}
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
            </Box>

            <TextField
              {...register('classroom')}
              label={t('add-lesson-modal.classroom')}
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
                    label={t('add-lesson-modal.canteen')}
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
                    label={t('add-lesson-modal.lead')}
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
