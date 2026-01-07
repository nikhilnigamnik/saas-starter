import { auth } from '@/lib/auth';
import { getUser, getUserPasswordAccount } from '@/lib/queries/user';
import { headers } from 'next/headers';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangePassword } from '@/components/layout';
import { setPassword } from '@/lib/actions/password';
import Image from 'next/image';
import React from 'react';
import { Themetoggle } from '@/components/ui/theme-toggle';

export async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <div>Please sign in to view your settings.</div>;
  }

  const user = await getUser(session.user.id);

  if (!user) {
    return <div>User not found.</div>;
  }

  const passwordAccount = await getUserPasswordAccount(session.user.id);
  const hasPassword = !!passwordAccount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-base font-medium">Settings</h1>
        <p className="text-xs text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={user.name} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={user.email} disabled />
          {user.emailVerified && <p className="text-xs text-muted-foreground">Email verified</p>}
        </div>

        {user.image && (
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              <Image
                src={user.image}
                alt={user.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <ChangePassword hasPassword={hasPassword} setPasswordAction={setPassword} />
      </div>
      <Themetoggle />
    </div>
  );
}
