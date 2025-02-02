import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLesson } from '@/components/modals/add-lesson/server-action';
import { toast } from 'react-toastify';
import { defaultFields } from '@/components/modals/add-lesson/config';
import { useTranslations } from 'next-intl';
import { type UseFormReset } from 'react-hook-form';
import { type AddLessonFields } from './validation';
import { redirect } from 'next/navigation';

export const useSendLessonMutation = (reset: UseFormReset<AddLessonFields>) => {
  const t = useTranslations('add-lesson-modal');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLesson,
    onSuccess: (data) => {
      if (!data) return;
      if (data.isSuccess) {
        toast(t('success'), { type: 'success' });
        reset((fields) => ({
          ...defaultFields,
          dayOfWeek: fields.dayOfWeek,
          lesson: fields.lesson,
        }));
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
      }
      if (data.error === 'UNAUTH') {
        redirect('/auth/sign-out');
      } else if (data.error) {
        toast(t(`errors.${data.error}`), { type: 'error' });
      } else if (data.isError) {
        toast(t('errors.unexpected'), { type: 'error' });
      }
    },
    mutationKey: ['schedule'],
  });
};
