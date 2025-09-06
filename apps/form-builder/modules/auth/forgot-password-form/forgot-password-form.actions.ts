import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  type ForgotPasswordFormSchema,
  forgotPasswordFormSchema,
} from '@/schemas/auth';

import { useForgotPasswordMutation } from '@/services/auth';

const useForgotPasswordFormActions = () => {
  const { mutateAsync, isPending } = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (payload: ForgotPasswordFormSchema) => {
    return await mutateAsync(payload);
  };

  return { form, onSubmit, isPending };
};

export default useForgotPasswordFormActions;
