import { GalleryVerticalEndIcon } from 'lucide-react';
import Link from 'next/link';

import { privateRoutes } from '@/constants/routes';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/core-ui/components/sidebar';

const NavBrand = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href={privateRoutes.home}>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEndIcon className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="text-lg font-medium">Form Builder</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavBrand;
