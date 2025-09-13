import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

axiosInstance.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem('auth-storage');
  const token = authStorage ? JSON.parse(authStorage).state.token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
