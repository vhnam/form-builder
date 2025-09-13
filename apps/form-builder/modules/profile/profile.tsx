import React, { forwardRef } from 'react';

import { User } from '@/types/user';

import ProfileForm, { type ProfileFormRef } from './profile-form';

interface ProfileProps {
  user: User;
}

const ProfileScreen = forwardRef<ProfileFormRef, ProfileProps>(
  ({ user }, ref) => {
    return (
      <div className="flex flex-1">
        <div className="flex-1 p-6">
          <ProfileForm ref={ref} user={user} />
        </div>
      </div>
    );
  }
);

ProfileScreen.displayName = 'Profile';

export default ProfileScreen;
