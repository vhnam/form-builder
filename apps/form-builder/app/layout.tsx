import '@repo/core-ui/globals.css';

import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { BRAND_DESCRIPTION, BRAND_NAME } from '@/constants/branding';

import QueryProvider from '@/providers/query';
import ThemeProvider from '@/providers/theme';

import { Toaster } from '@repo/core-ui/components/sonner';

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: BRAND_DESCRIPTION,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
