'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { getUser } from '@/lib/queries/user';

type User = Awaited<ReturnType<typeof getUser>>;

interface UserContextType {
  user: User | null;
  session: { user: { id: string } } | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  user,
  session,
}: {
  children: ReactNode;
  user: User | null;
  session: { user: { id: string } } | null;
}) {
  return <UserContext.Provider value={{ user, session }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
