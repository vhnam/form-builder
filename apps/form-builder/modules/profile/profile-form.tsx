import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { forwardRef, useImperativeHandle } from 'react';
import { FormState } from 'react-hook-form';
import { toast } from 'sonner';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { useClientOnly } from '@repo/core-ui/hooks/use-client-only';

import { ProfileFormSchema } from '@/schemas/profile';

import { type User } from '@/types/user';

import { profileQueryKey } from '@/services/auth';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/core-ui/components/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/core-ui/components/form';
import { Input } from '@repo/core-ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

import useProfileFormActions from './profile.actions';

interface ProfileFormProps {
  user: User;
}

export interface ProfileFormRef {
  isSubmitting: boolean;
  formState: FormState<ProfileFormSchema>;
  submit: () => void;
}

const ProfileForm = forwardRef<ProfileFormRef, ProfileFormProps>(
  ({ user }, ref) => {
    const router = useRouter();
    const { setTheme } = useTheme();
    const queryClient = useQueryClient();
    const hasMounted = useClientOnly();
    const { form, onSubmit, isPending } = useProfileFormActions({ user });

    useImperativeHandle(ref, () => ({
      submit: form.handleSubmit(handleFormSubmit),
      isSubmitting: isPending,
      formState: form.formState,
    }));

    const handleFormSubmit = async (payload: ProfileFormSchema) => {
      try {
        const response = await onSubmit(payload);
        await queryClient.invalidateQueries({
          queryKey: profileQueryKey.getProfile,
        });
        setTheme(response.interfaceMode);
        toast.success('Profile updated successfully');
        setTimeout(() => {
          router.push(PRIVATE_ROUTES.home);
        }, 1000);
      } catch (error) {
        toast.error('Failed to update profile');
        console.log(error);
      }
    };

    if (!hasMounted) {
      return <div>Loading....</div>;
    }

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            disabled
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Email cannot be changed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="interfaceLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interface language</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en-US">English</SelectItem>
                              <SelectItem value="vi-VN">Tiếng Việt</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription className="text-xs">
                          This will only display your own interface in the
                          chosen language.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="interfaceMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interface mode</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light mode</SelectItem>
                              <SelectItem value="dark">Dark mode</SelectItem>
                              <SelectItem value="system">
                                Use system settings
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Displays your interface in the chosen mode.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    );
  }
);

ProfileForm.displayName = 'ProfileForm';

export default ProfileForm;
