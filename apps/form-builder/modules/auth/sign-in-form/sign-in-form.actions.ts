import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { type SignInFormSchema, signInFormSchema } from '@/schemas/auth';

import { useSignInMutation } from '@/services/auth';

import { useAuthStore } from '@/stores/auth';

const useSignInFormActions = () => {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { setAuth } = useAuthStore();
  const { mutate, isPending } = useSignInMutation();

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (payload: SignInFormSchema) => {
    mutate(payload, {
      onSuccess: (response) => {
        setAuth(response.user, response.accessToken, response.refreshToken);
        setTheme(response.user.interfaceMode || 'system');

        router.push(PRIVATE_ROUTES.home);
      },
    });
  };

  return { form, onSubmit, isPending };
};

export default useSignInFormActions;
