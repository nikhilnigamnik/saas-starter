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
  } catch (error: any) {
    return {
      error: error?.message || 'Failed to set password. Please try again.',
    };
  }
}

