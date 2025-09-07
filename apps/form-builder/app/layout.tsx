import '@repo/core-ui/globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { BRAND_DESCRIPTION, BRAND_NAME } from '@/constants/branding';

import QueryProvider from '@/providers/query';

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: BRAND_DESCRIPTION,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
