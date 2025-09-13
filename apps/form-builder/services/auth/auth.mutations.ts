import { useMutation } from '@tanstack/react-query';

import apiClient from '@/utils/apiClient';

import type {
  ForgotPasswordFormSchema,
  SignInFormSchema,
  SignUpFormSchema,
} from '@/schemas/auth';
import { ProfileFormSchema } from '@/schemas/profile';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: async (payload: SignInFormSchema) => {
      const response = await apiClient.post('/auth/login', payload);
      return response.data;
    },
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (payload: SignUpFormSchema) => {
      const response = await apiClient.post('/auth/register', payload);
      return response.data;
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordFormSchema) => {
      const response = await apiClient.post('/auth/forgot-password', payload);
      return response.data;
    },
  });
};

export const useProfileMutation = () => {
  return useMutation({
    mutationFn: async (payload: ProfileFormSchema) => {
      const response = await apiClient.put('/auth/profile', payload);
      return response.data;
    },
  });
};
