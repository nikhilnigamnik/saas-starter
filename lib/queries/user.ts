'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db';
import { usage } from '../db/schema';

export const createInitialUsage = async (user_id: string) => {
  await db.insert(usage).values({
    user_id,
    usage_limit: 2,
    current_usage: 0,
  });
};

export const updateUsage = async (user_id: string, usage_limit: number, current_usage: number) => {
  await db.update(usage).set({ usage_limit: 20 }).where(eq(usage.user_id, userId));
};
