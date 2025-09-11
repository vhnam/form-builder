import { useMemo } from 'react';

import { useClientOnly } from '@repo/core-ui/hooks/use-client-only';

import { User } from '@/types/user';

import { Avatar, AvatarFallback } from '@repo/core-ui/components/avatar';

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const hasMounted = useClientOnly();

  const shortName = useMemo(
    () =>
      user
        ? ([user.firstName, user.lastName]
            .filter(Boolean)
            .map((name) => name[0]?.toUpperCase() || '')
            .join('') ?? '-')
        : '-',
    [user]
  );

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarFallback className="rounded-lg">{shortName}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">
          {user.firstName} {user.lastName}
        </span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
};

export default UserProfile;
