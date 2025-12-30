'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function setPassword(newPassword: string) {
  try {
    await auth.api.setPassword({
      body: { newPassword },
      headers: await headers(),
    });

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: 'Failed to set password. Please try again.',
    };
  }
}
