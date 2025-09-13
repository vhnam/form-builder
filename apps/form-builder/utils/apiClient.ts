import axios from 'axios';

import { useAuthStore } from '@/stores/auth';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
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
