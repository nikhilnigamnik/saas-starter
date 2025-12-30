import { relations } from 'drizzle-orm';
import { integer, pgEnum } from 'drizzle-orm/pg-core';
import { pgTable, text, timestamp, boolean, index, uuid, jsonb } from 'drizzle-orm/pg-core';

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'active',
  'past_due',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'trialing',
  'unpaid',
  'paused',
]);

export const subscriptionIntervalEnum = pgEnum('subscription_interval', [
  'month',
  'year',
  'week',
  'day',
]);

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  email_verified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  'session',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    expires_at: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ip_address: text('ip_address'),
    user_agent: text('user_agent'),
    user_id: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('session_user_id_idx').on(table.user_id)],
);

export const account = pgTable(
  'account',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    account_id: text('account_id').notNull(),
    provider_id: text('provider_id').notNull(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    access_token: text('access_token'),
    refresh_token: text('refresh_token'),
    id_token: text('id_token'),
    access_token_expires_at: timestamp('access_token_expires_at'),
    refresh_token_expires_at: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('account_user_id_idx').on(table.user_id)],
);

export const verification = pgTable(
  'verification',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expires_at: timestamp('expires_at').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
);

export const usage = pgTable(
  'usage',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id')
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: 'cascade' }),
    usage_limit: integer('usage_limit').default(2).notNull(), // Usage limit (2 for free tier, 20 for pro). Updated when subscription changes
    current_usage: integer('current_usage').default(0).notNull(), // Current usage count. Increments when services are used, resets periodically
    reset_at: timestamp('reset_at'), // When usage should reset (e.g., end of billing period or monthly)
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('usage_user_id_idx').on(table.user_id)],
);

export const subscription = pgTable(
  'subscription',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    subscription_id: text('subscription_id').notNull().unique(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    amount: integer('amount').notNull(), // Amount in smallest currency unit (e.g., cents)
    status: subscriptionStatusEnum('status').default('active').notNull(),
    interval: subscriptionIntervalEnum('interval').notNull(), // Billing interval
    customer_id: text('customer_id').notNull(),
    product_id: text('product_id').notNull(),
    price_id: text('price_id'), // Price ID from payment provider
    cancel_at: timestamp('cancel_at'),
    canceled_at: timestamp('canceled_at'), // When subscription was actually canceled
    cancel_at_period_end: boolean('cancel_at_period_end').default(false).notNull(),
    start_at: timestamp('start_at').notNull(),
    ended_at: timestamp('ended_at'), // When subscription actually ended
    current_period_start: timestamp('current_period_start').notNull(),
    current_period_end: timestamp('current_period_end').notNull(),
    metadata: jsonb('metadata'), // Additional subscription data
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index('subscription_user_id_idx').on(table.user_id),
    index('subscription_subscription_id_idx').on(table.subscription_id),
    index('subscription_customer_id_idx').on(table.customer_id),
    index('subscription_status_idx').on(table.status),
  ],
);

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  subscriptions: many(subscription),
  usage: one(usage),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.user_id],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.user_id],
    references: [user.id],
  }),
}));

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(user, {
    fields: [subscription.user_id],
    references: [user.id],
  }),
}));

export const usageRelations = relations(usage, ({ one }) => ({
  user: one(user, {
    fields: [usage.user_id],
    references: [user.id],
  }),
}));
