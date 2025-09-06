import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { SignInFormSchema } from '@/schemas/sign-in-form';
import { SignUpFormSchema } from '@/schemas/sign-up-form';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (values: SignInFormSchema) =>
      axios.post('/api/auth/sign-in', values),
  });
};

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (values: SignUpFormSchema) =>
      axios.post('/api/auth/sign-up', values),
  });
};
