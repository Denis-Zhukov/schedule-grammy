import { Modal, Box } from '@mui/material';
import { useModalState } from '@/hooks/use-modal';
import { useSendLessonMutation } from './quries';
import { LessonForm } from '../lesson-form';
import { useTranslations } from 'next-intl';
import { AddLessonFields } from '../validation';
import { UseFormReset } from 'react-hook-form';
import { defaultFields } from '../config';
import { isSuccess } from '@/utils/guards/is-success';

export const AddLessonModal = () => {
  const t = useTranslations('add-lesson-modal');

  const { isOpen, handleClose } = useModalState('add-lesson');
  const { mutateAsync: addLesson, isPending } = useSendLessonMutation();

  const handleSubmit =
    (reset: UseFormReset<AddLessonFields>) =>
    async (values: AddLessonFields) => {
      const data = await addLesson(values);

      if (isSuccess(data)) {
        reset((prev) => ({
          ...defaultFields,
          dayOfWeek: prev.dayOfWeek,
          lesson: prev.lesson,
        }));
      }
    };

  return (
    <Modal open={isOpen} onClose={handleClose} closeAfterTransition>
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
          onSubmit={handleSubmit}
          isPending={isPending}
          onClose={handleClose}
          t={t}
        />
      </Box>
    </Modal>
  );
};
