import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { SignInFormSchema } from '@/schemas/sign-in-form';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (values: SignInFormSchema) =>
      axios.post('/api/auth/sign-in', values),
  });
};
