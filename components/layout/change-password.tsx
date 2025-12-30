'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { z } from 'zod';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const setPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

interface ChangePasswordProps {
  hasPassword: boolean;
  setPasswordAction: (newPassword: string) => Promise<{ error?: string; success?: boolean }>;
}

export function ChangePassword({ hasPassword, setPasswordAction }: ChangePasswordProps) {
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Please fill in all fields correctly');
      return;
    }

    setLoading(true);

    const { data, error: changePasswordError } = await authClient.changePassword({
      newPassword: result.data.newPassword,
      currentPassword: result.data.currentPassword,
      revokeOtherSessions: true,
    });

    setLoading(false);

    if (changePasswordError) {
      setError(changePasswordError.message || 'Failed to change password');
      return;
    }

    if (data) {
      setSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }

  async function handleSetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = setPasswordSchema.safeParse({
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Please fill in all fields correctly');
      return;
    }

    setLoading(true);

    const response = await setPasswordAction(result.data.newPassword);

    setLoading(false);

    if (response.error) {
      setError(response.error);
      return;
    }

    if (response.success) {
      setSuccess('Password set successfully');
      setNewPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-medium">Change Password</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {hasPassword
            ? 'Update your password to keep your account secure.'
            : 'Set a password for your account to enable email/password sign in.'}
        </p>
      </div>

      <form
        onSubmit={hasPassword ? handleChangePassword : handleSetPassword}
        className="space-y-4"
      >
        {hasPassword && (
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setError('');
              }}
              required
              disabled={loading}
              placeholder="Enter your current password"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="newPassword">{hasPassword ? 'New Password' : 'Password'}</Label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError('');
            }}
            required
            disabled={loading}
            placeholder={hasPassword ? 'Enter your new password' : 'Enter a password'}
            minLength={8}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError('');
            }}
            required
            disabled={loading}
            placeholder="Confirm your password"
            minLength={8}
          />
        </div>

        {error && (
          <div className="px-2 py-1 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="px-2 py-1 text-xs text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-md">
            {success}
          </div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : hasPassword ? 'Change Password' : 'Set Password'}
        </Button>
      </form>
    </div>
  );
}

