'use client';

import { useGetProfileQuery } from '@/services/auth/auth.queries';

import { Button } from '@repo/core-ui/components/button';

import { PrivateLayoutHeader } from '@/layouts/private';

import Profile from '@/modules/profile';

const ProfilePage = () => {
  const { data, isPending } = useGetProfileQuery();

  return (
    <>
      <PrivateLayoutHeader
        title="Profile"
        actions={
          <Button variant="default" type="submit">
            Save
          </Button>
        }
      />
      {isPending ? <div>Loading...</div> : <Profile user={data.data} />}
    </>
  );
};

export default ProfilePage;
