import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLesson } from './server-action';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { isSuccess } from '@/utils/guards/is-success';
import { isError } from '@/utils/guards/is-error';

export const useSendLessonMutation = () => {
  const t = useTranslations('add-lesson-modal');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLesson,
    onSuccess: (data) => {
      if (!data) return;
      if (isSuccess(data)) {
        toast(t('success'), { type: 'success' });
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
      } else if (isError(data) && data.error === 'UNAUTH') {
        redirect('/auth/sign-out');
      } else if (isError(data) && data.error) {
        toast(t(`errors.${data.error}`), { type: 'error' });
      } else if (isError(data)) {
        toast(t('errors.unexpected'), { type: 'error' });
      }
    },
    mutationKey: ['schedule'],
  });
};
