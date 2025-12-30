'use client';

import { useTransition } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Button } from './button';
import { IconLoader } from '@tabler/icons-react';

export function Signout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSignOut() {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/');
          },
        },
      });
    });
  }
  return (
    <Button onClick={handleSignOut} disabled={isPending}>
      {isPending ? <IconLoader className="w-4 h-4 animate-spin" /> : 'Signout'}
    </Button>
  );
}
