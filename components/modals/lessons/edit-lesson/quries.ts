import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchLessonById,
  updateLesson,
  UpdateLessonReturnType,
} from './server-actions';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { isSuccess } from '@/utils/guards/is-success';
import { isError } from '@/utils/guards/is-error';
import { toastSuccess } from '@/utils/toasts/toast-success';
import { toastError } from '@/utils/toasts/toast-error';

export const useFetchLesson = (lessonId: string | null) => {
  return useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => fetchLessonById(lessonId),
    enabled: !!lessonId,
  });
};

export const useUpdateLessonMutation = () => {
  const t = useTranslations('edit-lesson-modal');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLesson,
    onSuccess: (data: UpdateLessonReturnType) => {
      if (!data) return;
      if (isSuccess(data)) {
        toastSuccess(t('success'));
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
        queryClient.invalidateQueries({ queryKey: ['lesson'] });
      } else if (isError(data) && data.error === 'UNAUTH') {
        redirect('/auth/sign-out');
      } else if (isError(data) && data.error) {
        toastError(t(`errors.${data.error}`));
      } else if (isError(data)) {
        toastError(t('errors.unexpected'));
      }
    },
    mutationKey: ['schedule', 'lesson'],
  });
};
