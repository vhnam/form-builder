'use client';

import Image from 'next/image';
import Link from 'next/link';

import { SignInForm } from '@/modules/sign-in/sign-in-form';

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image
              width={50}
              height={50}
              src={'/better-auth-starter.png'}
              alt="Better Auth Starter Logo"
              priority
            />
          </div>
          Form Builder
        </Link>
        <SignInForm />
      </div>
    </div>
  );
}
