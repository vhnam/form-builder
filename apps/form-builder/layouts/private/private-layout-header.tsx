import { ReactNode } from 'react';

import { Separator } from '@repo/core-ui/components/separator';
import { SidebarTrigger } from '@repo/core-ui/components/sidebar';

interface PrivateLayoutHeaderProps {
  title: string;
  actions?: ReactNode;
}

const PrivateLayoutHeader = ({ title, actions }: PrivateLayoutHeaderProps) => (
  <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
    <div className="flex items-center gap-2">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <strong className="font-display text-lg text-gray-900 dark:text-gray-100">
        {title}
      </strong>
    </div>
    {actions}
  </header>
);

export default PrivateLayoutHeader;
