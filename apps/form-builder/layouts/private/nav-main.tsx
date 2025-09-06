import { FileTextIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/core-ui/components';

import { privateRoutes } from '@/constants/routes';

const items = [
  {
    title: 'Home',
    url: privateRoutes.home,
    icon: HomeIcon,
  },
  {
    title: 'Forms',
    url: privateRoutes.forms.list,
    icon: FileTextIcon,
  },
];

const NavMain = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={{
                children: item.title,
                hidden: false,
              }}
              isActive={pathname === item.url}
              className="px-2.5 md:px-2"
            >
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
