'use client';

import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@repo/core-ui/components';

import { publicRoutes } from '@/constants/routes';

import useSignUpFormActions from './sign-up-form.actions';

const SignUpForm = () => {
  const { form, onSubmit, isPending } = useSignUpFormActions();

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create you Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="********"
                              {...field}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Link
                      href={publicRoutes.auth.forgotPassword}
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link
                  href={publicRoutes.auth.signIn}
                  className="underline underline-offset-4"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
