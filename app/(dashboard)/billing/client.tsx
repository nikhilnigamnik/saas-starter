'use client';

import { getUserUsage, getUserActiveSubscription } from '@/lib/queries/user';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UpgradeButton } from '@/components/ui/upgrade-button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/user-context';

interface Subscription {
  id: string;
  name: string;
  status: string;
  amount: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAt: Date | null;
  startAt: Date;
  customerId: string;
}

interface Usage {
  currentUsage: number;
  usageLimit: number;
  resetAt: Date | null;
}

export function BillingPage() {
  const { session } = useUser();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);

  useEffect(() => {
    async function fetchBillingData() {
      if (!session?.user) {
        return;
      }

      try {
        const [subscriptionData, usageData] = await Promise.all([
          getUserActiveSubscription(session.user.id),
          getUserUsage(session.user.id),
        ]);
        setSubscription(subscriptionData as Subscription | null);
        setUsage(usageData as Usage | null);
      } catch (error) {
        console.error('Failed to fetch billing data:', error);
      } finally {
      }
    }

    fetchBillingData();
  }, [session]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-base font-medium">Billing</h1>
        <p className="text-xs text-muted-foreground">
          Manage your subscription and view usage details.
        </p>
      </div>

      {usage && (
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium mb-2">Usage</h2>
            <div className="bg-secondary rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Current Usage</span>
                <span className="text-xs font-medium">
                  {usage.currentUsage} / {usage.usageLimit}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-brand h-2 rounded-full transition-all"
                  style={{
                    width: `${Math.min((usage.currentUsage / usage.usageLimit) * 100, 100)}%`,
                  }}
                />
              </div>
              {usage.resetAt && (
                <p className="text-xs text-muted-foreground">
                  Resets on {formatDate(usage.resetAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {subscription ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium mb-2">Subscription</h2>
            <div className="bg-secondary rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{subscription.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{subscription.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(subscription.amount)}</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Current Period</Label>
                  <span className="text-xs">
                    {formatDate(subscription.currentPeriodStart)} -{' '}
                    {formatDate(subscription.currentPeriodEnd)}
                  </span>
                </div>

                {subscription.cancelAt && (
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">Cancels On</Label>
                    <span className="text-xs">{formatDate(subscription.cancelAt)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Started</Label>
                  <span className="text-xs">{formatDate(subscription.startAt)}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-fit" asChild>
                  <Link target="_blank" href={`/api/portal?customer_id=${subscription.customerId}`}>
                    Manage Subscription
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium mb-2">Subscription</h2>
            <div className="bg-secondary rounded-lg p-6 text-center space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">No active subscription</p>
                <p className="text-xs text-muted-foreground">
                  Upgrade to unlock premium features and increase your usage limits.
                </p>
              </div>
              <UpgradeButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
