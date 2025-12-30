'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IconCircleCheck } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
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
          <div className="rounded-full bg-green-500/10 p-4">
            <IconCircleCheck className="size-12 text-green-500" strokeWidth={1.5} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Payment Successful!</h1>
          <p className="text-sm text-muted-foreground">
            Your payment has been processed successfully. You now have access to all premium features.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/billing">View Billing</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
