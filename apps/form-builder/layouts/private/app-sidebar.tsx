import { ComponentProps } from 'react';

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

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: 'https://ui.shadcn.com/avatars/shadcn.jpg',
  },
};

const AppSidebar = (props: ComponentProps<typeof Sidebar>) => {
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
