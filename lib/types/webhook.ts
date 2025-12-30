import type { Prisma } from '@/prisma/generated/prisma/client';

export interface WebhookPayload {
  business_id: string;
  type: string;
  timestamp: string | Date;
  data: {
    payload_type: string;
    subscription_id: string;
    customer_id?: string;
    customer?: {
      customer_id: string;
      email: string;
      name: string;
    };
    status: string;
    product_id: string;
    recurring_pre_tax_amount: number;
    created_at: string;
    cancelled_at?: string | null;
    cancel_at_next_billing_date?: boolean;
    next_billing_date: string;
    previous_billing_date?: string;
    currency?: string;
    payment_frequency_count?: number;
    payment_frequency_interval?: string;
    subscription_period_count?: number;
    subscription_period_interval?: string;
    tax_inclusive?: boolean;
    trial_period_days?: number;
    on_demand?: boolean;
    discount_id?: string | null;
    addons?: Prisma.InputJsonValue;
    billing?: Prisma.InputJsonValue;
  };
}
