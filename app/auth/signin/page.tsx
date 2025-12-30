'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { IconLoader } from '@tabler/icons-react';
import Image from 'next/image';

const signInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const result = signInSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Please fill in all fields correctly');
      return;
    }

    const { error: signInError } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => {
          setLoading(true);
          setError('');
        },
        onSuccess: () => {
          setLoading(false);
          router.push('/dashboard');
        },
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message || 'An error occurred during sign in');
        },
      },
    );

    if (signInError) {
      setError(signInError.message || 'An error occurred during sign in');
    }
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen px-4">
      <div className="max-w-sm w-full mx-auto space-y-6">
        <div className="space-y-2">
          <Image
            src="/icon.png"
            alt="BetterSeo"
            width={30}
            height={30}
            className="hidden dark:block"
          />
          <Image
            src="/icon-dark.png"
            alt="BetterSeo"
            width={30}
            height={30}
            className="block dark:hidden"
          />
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <form onSubmit={handleSignIn} className="space-y-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              required
              disabled={loading}
            />
          </div>
          {error && (
            <div className="px-2 py-1 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <IconLoader className="size-4 animate-spin" /> : 'Sign in'}
          </Button>
        </form>
        <div className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account??{' '}
          <Link href="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
}
