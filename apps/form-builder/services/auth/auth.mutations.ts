import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import type {
  ForgotPasswordFormSchema,
  SignInFormSchema,
  SignUpFormSchema,
} from '@/schemas/auth';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (payload: SignInFormSchema) =>
      axios.post('/api/auth/sign-in', payload),
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (payload: SignUpFormSchema) =>
      axios.post('/api/auth/sign-up', payload),
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordFormSchema) =>
      axios.post('/api/auth/forgot-password', payload),
  });
};
