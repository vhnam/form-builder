import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { type ProfileFormSchema, profileFormSchema } from '@/schemas/profile';

import { User } from '@/types/user';

interface UseProfileFormActionsProps {
  user: User;
}

const useProfileFormActions = ({ user }: UseProfileFormActionsProps) => {
  // const router = useRouter();
  // const { mutate, isPending } = useSignInMutation();

  console.log('user', user);

  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const onSubmit = (payload: ProfileFormSchema) => {
    // mutate(payload, {
    //   onSuccess: (response) => {
    //     console.log(response);
    //   },
    // });
  };

  return { form, onSubmit };
};

export default useProfileFormActions;
