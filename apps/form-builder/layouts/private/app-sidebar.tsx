import { type ComponentProps } from 'react';

import { useAuthStore } from '@/stores/auth';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from '@repo/core-ui/components/sidebar';

import NavBrand from './nav-brand';
import NavMain from './nav-main';
import NavUser from './nav-user';

const AppSidebar = (props: ComponentProps<typeof Sidebar>) => {
  const { user } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavBrand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <NavMain />
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
