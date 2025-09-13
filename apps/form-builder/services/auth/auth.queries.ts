import { useQuery } from '@tanstack/react-query';

import axios from '@/utils/apiClient';

export const profileQueryKey = {
  getProfile: ['/auth/profile'],
};

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: profileQueryKey.getProfile,
    queryFn: async () => {
      const response = await axios.get('/auth/profile');
      return response.data;
    },
  });
};
