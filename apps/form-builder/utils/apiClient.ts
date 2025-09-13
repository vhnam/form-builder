import { useAuthStore } from '@/stores/auth';

import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:4000',
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
