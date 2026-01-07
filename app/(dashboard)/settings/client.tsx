'use client';

import { getUserPasswordAccount } from '@/lib/queries/user';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangePassword } from '@/components/layout';
import { setPassword } from '@/lib/actions/password';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Themetoggle } from '@/components/ui/theme-toggle';
import { useUser } from '@/context/user-context';

export function SettingsPage() {
  const { user, session } = useUser();
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkPassword() {
      if (!session?.user) {
        return;
      }

      try {
        const passwordAccount = await getUserPasswordAccount(session.user.id);
        setHasPassword(!!passwordAccount);
      } catch (error) {
        console.error('Failed to check password account:', error);
        setHasPassword(false);
      } finally {
      }
    }

    checkPassword();
  }, [session]);

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
          <Input id="name" defaultValue={user?.name} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={user?.email} disabled />
          {user?.emailVerified && <p className="text-xs text-muted-foreground">Email verified</p>}
        </div>

        {user?.image && (
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
        <ChangePassword hasPassword={hasPassword ?? false} setPasswordAction={setPassword} />
      </div>
      <Themetoggle />
    </div>
  );
}
