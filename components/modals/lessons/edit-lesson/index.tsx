import { Modal, Box } from '@mui/material';
import { useModalState } from '@/hooks/use-modal';
import { useUpdateLessonMutation, useFetchLesson } from './quries';
import { LessonForm } from '../lesson-form';
import { useSearchParams } from 'next/navigation';
import { Schedule } from '@prisma/client';
import { DAYS_OF_WEEK, CLASSES } from '../config';
import { format, toZonedTime } from 'date-fns-tz';
import { useTranslations } from 'next-intl';
import type { AddLessonFields } from '../validation';
import { isError } from '@/utils/guards/is-error';
import { SkeletonModal } from '@/components/modals/skeleton';

export const EditLessonModal = () => {
  const t = useTranslations('edit-lesson-modal');

  const { isOpen, handleClose } = useModalState('edit-lesson', ['modal', 'id']);

  const params = useSearchParams();
  const lessonId = params.get('id');

  const { data, isFetching, isLoading } = useFetchLesson(lessonId);
  const { mutateAsync: updateLesson, isPending } = useUpdateLessonMutation();

  if (!lessonId || isError(data)) return null;

  if (!data || isFetching || isLoading) {
    return <SkeletonModal />;
  }

  const lesson = data as Schedule;

  const handleSubmit = () => async (values: AddLessonFields) => {
    await updateLesson({ ...values, lessonId });
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <LessonForm
          initialValues={{
            dayOfWeek:
              lesson.dayOfWeek as unknown as (typeof DAYS_OF_WEEK)[number],
            lesson: lesson.lesson,
            class: String(lesson.class) as unknown as (typeof CLASSES)[number],
            subclass: lesson.subclass,
            timeStart: format(toZonedTime(lesson.timeStart, 'UTC'), 'HH:mm'),
            timeEnd: format(toZonedTime(lesson.timeEnd, 'UTC'), 'HH:mm'),
            classroom: lesson.classroom,
            canteen: lesson.canteen,
            lead: lesson.lead,
          }}
          onSubmit={handleSubmit}
          isPending={isPending}
          onClose={handleClose}
          t={t}
        />
      </Box>
    </Modal>
  );
};
