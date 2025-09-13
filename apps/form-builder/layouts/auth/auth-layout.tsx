'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, useEffect } from 'react';

import { BRAND_LOGO, BRAND_NAME } from '@/constants/branding';
import { PUBLIC_ROUTES } from '@/constants/routes';

const AuthLayout = ({ children }: PropsWithChildren) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setTheme(theme || 'system');
  }, [setTheme]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={PUBLIC_ROUTES.landing}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Image
              width={48}
              height={48}
              src={BRAND_LOGO}
              alt={BRAND_NAME}
              priority
              className="rounded-md"
            />
          </div>
          {BRAND_NAME}
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
