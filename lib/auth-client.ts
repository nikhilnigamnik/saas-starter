import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});

export const getAuth = () => {
  const { data: session, isPending } = authClient.useSession();
  return { session, isPending };
};

export const { useSession } = authClient;
