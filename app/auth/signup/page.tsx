'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const result = signUpSchema.safeParse({
      name,
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Please fill in all fields correctly');
      return;
    }

    const { error: signUpError } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: '/auth/signin',
      },
      {
        onRequest: () => {
          setLoading(true);
          setError('');
        },
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        },
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message || 'An error occurred during sign up');
        },
      },
    );

    if (signUpError) {
      setError(signUpError.message || 'An error occurred during sign up');
    }
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen px-4">
      <div className="max-w-sm w-full mx-auto space-y-6">
        <div className="space-y-1">
          <h4 className="text-base font-medium">BetterSeo</h4>
          <p className="text-sm text-muted-foreground">Sign up to your account</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              required
              disabled={loading}
            />
          </div>
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
              minLength={8}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">Password must be at least 8 characters</p>
          </div>
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              Account created successfully! Redirecting to sign in...
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>
        </form>
        <div className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account??{' '}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
