import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
});

export const getAuth = () => {
  const { data: session, isPending } = authClient.useSession();
  return { session, isPending };
};

export const { useSession } = authClient;
