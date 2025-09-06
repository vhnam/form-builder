import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  type SignUpFormSchema,
  signUpFormSchema,
} from '@/schemas/sign-up-form';

import { useSignUpMutation } from '@/services/auth';

const useSignUpFormActions = () => {
  const { mutateAsync, isPending } = useSignUpMutation();

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignUpFormSchema) => {
    return await mutateAsync(values);
  };

  return { form, onSubmit, isPending };
};

export default useSignUpFormActions;
