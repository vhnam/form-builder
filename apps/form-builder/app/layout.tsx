import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import QueryProvider from '@/providers/query';

import './globals.css';

export const metadata: Metadata = {
  title: 'Form Builder',
  description: 'Component library for building and rendering visual forms',
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
