'use client';

import { type PropsWithChildren } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@repo/core-ui/components';

import AppSidebar from './app-sidebar';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
