'use client';

import { useTheme } from 'next-themes';

import { useClientOnly } from '@repo/core-ui/hooks/use-client-only';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/core-ui/components/card';
import { Input } from '@repo/core-ui/components/input';
import { Label } from '@repo/core-ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/core-ui/components/select';

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const hasMounted = useClientOnly();

  return (
    <div className="flex flex-1">
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <h3 className="font-display text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Profile
          </h3>

          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>First name</Label>
                  <Input type="text" placeholder="First name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Last name</Label>
                  <Input type="text" placeholder="Last name" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="Email" disabled readOnly />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email cannot be changed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Interface mode</Label>
                  {hasMounted && (
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light mode</SelectItem>
                        <SelectItem value="dark">Dark mode</SelectItem>
                        <SelectItem value="system">
                          Use system settings
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Displays your interface in the chosen mode.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
