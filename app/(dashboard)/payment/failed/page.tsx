'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IconCircleX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentFailedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-secondary rounded-lg p-4">
      <div className="text-center space-y-6 max-w-md w-full px-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <IconCircleX className="size-12 text-destructive" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Payment Failed</h1>
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t process your payment. Please check your payment method and try again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/billing">Try Again</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
