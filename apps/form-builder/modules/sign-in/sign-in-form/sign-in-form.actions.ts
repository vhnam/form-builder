import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  type SignInFormSchema,
  signInFormSchema,
} from '@/schemas/sign-in-form';

import { useSignInMutation } from '@/services/auth';

const useSignInFormActions = () => {
  const { mutateAsync, isPending } = useSignInMutation();

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormSchema) => {
    return await mutateAsync(values);
  };

  return { form, onSubmit, isPending };
};

export default useSignInFormActions;
