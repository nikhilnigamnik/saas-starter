import { getUserByEmail, upsertSubscription } from '@/lib/queries/user';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@/prisma/generated/prisma/client';
import type { WebhookPayload } from '@/lib/types/webhook';

export async function processSubscriptionWebhook(
  payload: WebhookPayload | Record<string, unknown>,
) {
  if (
    !payload ||
    typeof payload !== 'object' ||
    !('data' in payload) ||
    typeof payload.data !== 'object' ||
    !payload.data
  ) {
    console.error('Invalid payload structure:', payload);
    return;
  }

  const subscriptionData = payload.data as WebhookPayload['data'];
  if (!subscriptionData || subscriptionData.payload_type !== 'Subscription') {
    console.error('Invalid subscription payload:', payload);
    return;
  }

  const customerEmail = subscriptionData.customer?.email;
  if (!customerEmail) {
    console.error('No customer email found in payload');
    return;
  }

  const user = await getUserByEmail(customerEmail);
  if (!user) {
    console.error(`User not found for email: ${customerEmail}`);
    return;
  }

  const subscriptionId = subscriptionData.subscription_id;
  const subscription: Prisma.SubscriptionUncheckedCreateInput = {
    id: subscriptionId,
    userId: user.id,
    subscriptionId: subscriptionId,
    customerId: subscriptionData.customer?.customer_id || '',
    name: subscriptionData.customer?.name || 'Unknown',
    amount: subscriptionData.recurring_pre_tax_amount || 0,
    status: subscriptionData.status || 'unknown',
    productId: subscriptionData.product_id || '',
    cancelAt: subscriptionData.cancelled_at
      ? new Date(subscriptionData.cancelled_at)
      : subscriptionData.cancel_at_next_billing_date
      ? new Date(subscriptionData.next_billing_date)
      : null,
    startAt: new Date(subscriptionData.created_at),
    endedAt: subscriptionData.cancelled_at ? new Date(subscriptionData.cancelled_at) : null,
    currentPeriodStart: new Date(
      subscriptionData.previous_billing_date || subscriptionData.created_at,
    ),
    currentPeriodEnd: new Date(subscriptionData.next_billing_date),
    metadata: {
      currency: subscriptionData.currency,
      payment_frequency_count: subscriptionData.payment_frequency_count,
      payment_frequency_interval: subscriptionData.payment_frequency_interval,
      subscription_period_count: subscriptionData.subscription_period_count,
      subscription_period_interval: subscriptionData.subscription_period_interval,
      tax_inclusive: subscriptionData.tax_inclusive,
      trial_period_days: subscriptionData.trial_period_days,
      on_demand: subscriptionData.on_demand,
      discount_id: subscriptionData.discount_id,
      addons: subscriptionData.addons as Prisma.InputJsonValue,
      billing: subscriptionData.billing as Prisma.InputJsonValue,
    } as Prisma.InputJsonValue,
  };

  const [result] = await Promise.all([
    upsertSubscription(subscriptionId, subscription),
    prisma.usage.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        usageLimit: 20,
        currentUsage: 0,
      },
      update: {
        usageLimit: 20,
      },
    }),
  ]);

  return result;
}
