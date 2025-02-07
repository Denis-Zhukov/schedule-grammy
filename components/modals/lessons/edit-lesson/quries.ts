import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchLessonById,
  updateLesson,
  UpdateLessonReturnType,
} from './server-actions';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { isSuccess } from '@/utils/guards/is-success';
import { isError } from '@/utils/guards/is-error';

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
        toast(t('success'), { type: 'success' });
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
        queryClient.invalidateQueries({ queryKey: ['lesson'] });
      } else if (isError(data) && data.error === 'UNAUTH') {
        redirect('/auth/sign-out');
      } else if (isError(data) && data.error) {
        toast(t(`errors.${data.error}`), { type: 'error' });
      } else if (isError(data)) {
        toast(t('errors.unexpected'), { type: 'error' });
      }
    },
    mutationKey: ['schedule', 'lesson'],
  });
};
