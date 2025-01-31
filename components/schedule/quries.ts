import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteSchedule,
  getSchedule,
} from '@/components/schedule/server-action';

export const useGetSchedule = () => {
  return useQuery({
    queryFn: getSchedule,
    queryKey: ['schedule'],
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSchedule,
    onSuccess: (data) => {
      if (!data) return;
      if (data.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['schedule'] });
      }
    },
  });
};
