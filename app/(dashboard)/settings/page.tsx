import React, { Suspense } from 'react';
import { SettingsPage } from './client';
import { Metadata } from 'next';
import { Loading } from '@/components/ui/loading';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences.',
};

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <SettingsPage />
    </Suspense>
  );
}
