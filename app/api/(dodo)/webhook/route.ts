import { Webhooks } from '@dodopayments/nextjs';
import { processSubscriptionWebhook } from '@/lib/webhooks/subscription';

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,
  onPayload: async (payload) => {
    if (payload.data?.payload_type === 'Subscription') {
      await processSubscriptionWebhook(payload);
    }
  },
  onSubscriptionActive: async (payload) => {
    await processSubscriptionWebhook(payload);
  },
  onSubscriptionUpdated: async (payload) => {
    await processSubscriptionWebhook(payload);
  },
  onSubscriptionCancelled: async (payload) => {
    await processSubscriptionWebhook(payload);
  },
  onSubscriptionExpired: async (payload) => {
    await processSubscriptionWebhook(payload);
  },
  onSubscriptionPaused: async (payload) => {
    await processSubscriptionWebhook(payload);
  },
});
