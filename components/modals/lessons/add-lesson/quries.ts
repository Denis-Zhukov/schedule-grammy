import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLesson } from './server-action';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { isSuccess } from '@/utils/guards/is-success';
import { isError } from '@/utils/guards/is-error';
import { toastSuccess } from '@/utils/toasts/toast-success';
import { toastError } from '@/utils/toasts/toast-error';

export const useSendLessonMutation = () => {
  const t = useTranslations('add-lesson-modal');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLesson,
    onSuccess: (data) => {
      if (!data) return;
      if (isSuccess(data)) {
        toastSuccess(t('success'));
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
      } else if (isError(data) && data.error === 'UNAUTH') {
        redirect('/auth/sign-out');
      } else if (isError(data) && data.error) {
        toastError(t(`errors.${data.error}`));
      } else if (isError(data)) {
        toastError(t('errors.unexpected'));
      }
    },
    mutationKey: ['schedule'],
  });
};
