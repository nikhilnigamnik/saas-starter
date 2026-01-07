import { DashboardNav } from '@/components/layout';
import React from 'react';
import { auth } from '@/lib/auth';
import { getUser } from '@/lib/queries/user';
import { headers } from 'next/headers';
import { UserProvider } from '@/context/user-context';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let user = null;
  if (session?.user) {
    user = await getUser(session.user.id);
  }

  return (
    <section className="max-w-4xl mx-auto px-4 space-y-4">
      <UserProvider user={user} session={session}>
        <DashboardNav />
        {children}
      </UserProvider>
    </section>
  );
}
