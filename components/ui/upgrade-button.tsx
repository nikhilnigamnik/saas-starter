'use client';

import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import { useState } from 'react';

export function UpgradeButton() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  async function handleUpgrade() {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          customer: {
            email: session?.user?.email,
            name: session?.user?.name,
          },
          product_cart: [
            {
              product_id: 'pdt_0NVBlbAqnzz8ONADmThFw',
              quantity: 1,
              amount: 900,
            },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.checkout_url;
      } else {
        console.error('Checkout failed');
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleUpgrade} disabled={loading}>
      {loading ? 'Processing...' : 'Upgrade Now'}
    </Button>
  );
}
