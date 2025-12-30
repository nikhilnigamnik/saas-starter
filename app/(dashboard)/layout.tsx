import { DashboardNav } from '@/components/layout';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-4xl mx-auto px-4 space-y-4">
      <DashboardNav />
      {children}
    </section>
  );
}
