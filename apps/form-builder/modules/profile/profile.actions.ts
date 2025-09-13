import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { omit } from '@repo/core-ui/lib/lodash';

import { type ProfileFormSchema, profileFormSchema } from '@/schemas/profile';

import { User } from '@/types/user';

import { useProfileMutation } from '@/services/auth';

interface UseProfileFormActionsProps {
  user: User;
}

const useProfileFormActions = ({ user }: UseProfileFormActionsProps) => {
  const { mutateAsync, isPending } = useProfileMutation();

  const form = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      interfaceMode: user.interfaceMode,
      interfaceLanguage: user.interfaceLanguage,
    },
  });

  const onSubmit = async (payload: ProfileFormSchema) => {
    const omitiedPayload = omit(payload, 'email');
    return await mutateAsync(omitiedPayload);
  };

  return { form, isPending, onSubmit };
};

export default useProfileFormActions;
