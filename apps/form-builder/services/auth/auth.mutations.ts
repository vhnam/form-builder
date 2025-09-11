import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import type {
  ForgotPasswordFormSchema,
  SignInFormSchema,
  SignUpFormSchema,
} from '@/schemas/auth';

axios.defaults.baseURL = 'http://localhost:4000';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (payload: SignInFormSchema) => {
      const response = await axios.post('/auth/login', payload);
      return response.data;
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (payload: SignUpFormSchema) => {
      const response = await axios.post('/auth/register', payload);
      return response.data;
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordFormSchema) => {
      const response = await axios.post('/auth/forgot-password', payload);
      return response.data;
    },
  });
};
