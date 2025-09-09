'use client';

import { type PropsWithChildren } from 'react';

import { useClientOnly } from '@repo/core-ui/hooks/use-client-only';

import { ModeToggle } from '@repo/core-ui/components/mode-toggle';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@repo/core-ui/components/sidebar';

import AppSidebar from './app-sidebar';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  const hasMounted = useClientOnly();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        {children}
        {hasMounted && (
          <div className="z-99 fixed right-3 top-3 isolate">
            <ModeToggle />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
