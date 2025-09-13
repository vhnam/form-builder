import axios from '@/utils/axios';

import { useQuery } from '@tanstack/react-query';

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ['/auth/profile'],
    queryFn: async () => {
      const response = await axios.get('/auth/profile');
      return response.data;
    },
  });
};
