'use client';

import { PrivateLayoutHeader } from '@/layouts/private';

import React, { useRef } from 'react';

import { Button } from '@repo/core-ui/components/button';

import { useGetProfileQuery } from '@/services/auth';

import Profile, { type ProfileFormRef } from '@/modules/profile';

const ProfilePage = () => {
  const { data, isPending } = useGetProfileQuery();
  const profileFormRef = useRef<ProfileFormRef>(null);

  const handleSave = () => {
    profileFormRef.current?.submit();
  };

  return (
    <>
      <PrivateLayoutHeader
        title="Profile"
        actions={
          <Button
            variant="default"
            onClick={handleSave}
            disabled={
              profileFormRef.current?.isSubmitting ||
              !profileFormRef.current?.formState?.isDirty
            }
          >
            {profileFormRef.current?.isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        }
      />
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <Profile ref={profileFormRef} user={data} />
      )}
    </>
  );
};

export default ProfilePage;
