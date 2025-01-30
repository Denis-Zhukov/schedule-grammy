import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLesson } from '@/components/modals/add-lesson/server-action';

export const useAddLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
    mutationKey: ['lesson'],
  });
};
