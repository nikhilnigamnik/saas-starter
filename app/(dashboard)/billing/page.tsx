import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { BillingPage } from './client';
import { Loading } from '@/components/ui/loading';

export const metadata: Metadata = {
  title: 'Billing',
  description: 'Manage your billing and subscription.',
};

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <BillingPage />
    </Suspense>
  );
}
