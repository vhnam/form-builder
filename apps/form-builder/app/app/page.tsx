import { PrivateLayoutHeader } from '@/layouts/private';

import Dashboard from '@/modules/dashboard';

const DashboardPage = () => {
  return (
    <>
      <PrivateLayoutHeader title="Dashboard" />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
