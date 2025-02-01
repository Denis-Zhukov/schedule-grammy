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
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          width: 420,
          maxWidth: '90%',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {t('add-lesson-modal.title')}
        </Typography>
        <Box
          onSubmit={onSubmit}
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          <Controller
            control={control}
            name="dayOfWeek"
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={!!errors.dayOfWeek}
                fullWidth
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
                error={!!errors.lesson}
                fullWidth
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
                {...register('subclass')}
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
                input={<TextField label={t('add-lesson-modal.timeStart')} />}
                onChange={(_, value) => {
                  setValue(name, value);
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="timeEnd"
            render={({ field: { name } }) => (
              <TimeField
                input={<TextField label={t('add-lesson-modal.timeEnd')} />}
                onChange={(_, value) => {
                  setValue(name, value);
                }}
              />
            )}
          />

          <TextField
            {...register('classroom')}
            label={t('add-lesson-modal.classroom')}
            error={!!errors.classroom}
            fullWidth
          />

          <FormControlLabel
            control={<Checkbox {...register('canteen')} />}
            label={t('add-lesson-modal.canteen')}
          />
          <FormControlLabel
            control={<Checkbox {...register('lead')} />}
            label={t('add-lesson-modal.lead')}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              fullWidth
            >
              {t('add-lesson-modal.close')}
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {t('add-lesson-modal.add')}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
