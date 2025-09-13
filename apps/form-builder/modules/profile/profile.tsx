import { User } from '@/types/user';

import ProfileForm from './profile-form';

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className="flex flex-1">
      <div className="flex-1 p-6">
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default Profile;
