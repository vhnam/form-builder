'use client';

import { type PropsWithChildren } from 'react';

import {
  SidebarInset,
  SidebarProvider,
} from '@repo/core-ui/components/sidebar';

import AppSidebar from './app-sidebar';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
