import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLesson } from '@/components/modals/add-lesson/server-action';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export const useAddLesson = () => {
  const t = useTranslations('add-lesson-modal.errors');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLesson,
    onSuccess: (data) => {
      if (!data) return;
      if (data.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
      }
      if (data.isError && data.error) {
        toast(t(data.error), { type: 'error' });
      } else if (data.isError) {
        toast(t('unexpected'), { type: 'error' });
      }
    },
    mutationKey: ['schedule'],
  });
};
