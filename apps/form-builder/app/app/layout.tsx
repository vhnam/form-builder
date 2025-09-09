import { PropsWithChildren } from 'react';

import PrivateLayout from '@/layouts/private';

const AppLayout = ({ children }: PropsWithChildren) => {
  return <PrivateLayout>{children}</PrivateLayout>;
};

export default AppLayout;
