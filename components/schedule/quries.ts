import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSchedule, getSchedule } from './server-action';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { toastError } from '@/utils/toasts/toast-error';
import { isError } from '@/utils/guards/is-error';

export const useGetSchedule = () => {
  const t = useTranslations('schedule.errors');

  const query = useQuery({
    queryFn: getSchedule,
    queryKey: ['schedule'],
  });

  const { data, isSuccess } = query;

  useEffect(() => {
    if (isError(data) && data.error === 'UNAUTH') {
      redirect('/auth/sign-out');
    } else if (isError(data)) toastError(t('unexpected'));
  }, [t, data, isSuccess]);

  return query;
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (data) => {
      if (!data) return;
      if (data.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
      } else if (data.error === 'UNAUTH') {
        redirect('/auth/sign-out');
      }
    },
  });
};
