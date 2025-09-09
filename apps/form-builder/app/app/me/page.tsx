import { Button } from '@repo/core-ui/components/button';

import { PrivateLayoutHeader } from '@/layouts/private';

import Profile from '@/modules/profile';

const ProfilePage = () => {
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
      <Profile />
    </>
  );
};

export default ProfilePage;
