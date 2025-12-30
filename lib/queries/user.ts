'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@/prisma/generated/prisma/client';

export const getUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const updateUser = async (userId: string, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data,
  });
};

export const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const getUserUsage = async (userId: string) => {
  return await prisma.usage.findUnique({
    where: { userId },
  });
};

export const updateUserUsage = async (userId: string) => {
  return await prisma.usage.update({
    where: { userId },
    data: {
      currentUsage: {
        increment: 1,
      },
    },
  });
};

export const getUserPasswordAccount = async (userId: string) => {
  return await prisma.account.findFirst({
    where: {
      userId,
      providerId: 'credential',
      password: { not: null },
    },
  });
};

export const getUserActiveSubscription = async (userId: string) => {
  return await prisma.subscription.findFirst({
    where: {
      userId,
      status: {
        in: ['active', 'trialing'],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const upsertSubscription = async (
  subscriptionId: string,
  data: Prisma.SubscriptionUncheckedCreateInput,
) => {
  return await prisma.subscription.upsert({
    where: { id: subscriptionId },
    create: data,
    update: data,
  });
};
