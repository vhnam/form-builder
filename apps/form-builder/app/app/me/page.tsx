'use client';

import React, { useRef } from 'react';
import { toast } from 'sonner';

import { useGetProfileQuery } from '@/services/auth';

import { ErrorBoundary } from '@/components/error-boundary';
import { Spinner } from '@/components/spinner';

import { Button } from '@repo/core-ui/components/button';

import { PrivateLayoutHeader } from '@/layouts/private';

import Profile, { type ProfileFormRef } from '@/modules/profile';

const ProfilePage = () => {
  const { data, isPending } = useGetProfileQuery();
  const profileFormRef = useRef<ProfileFormRef>(null);

  const handleSave = () => {
    profileFormRef.current?.submit();
  };

  return (
    <ErrorBoundary
      onError={() => {
        toast.error('Failed to load profile');
      }}
    >
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
      {isPending ? <Spinner /> : <Profile ref={profileFormRef} user={data} />}
    </ErrorBoundary>
  );
};

export default ProfilePage;
