import { useQuery } from '@tanstack/react-query';
import { getSchedule } from '@/components/schedule/server-action';

export const useGetSchedule = () => {
  return useQuery({
    queryFn: getSchedule,
    queryKey: ['schedule'],
  });
};
