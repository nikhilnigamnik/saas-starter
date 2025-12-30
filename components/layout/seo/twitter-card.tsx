'use client';

import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

interface SEOTwitterCardProps {
  present: {
    twitterCard: boolean;
  };
  data: {
    twitterCard?: string;
  };
}

export function SEOTwitterCard({ present, data }: SEOTwitterCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h4 className="text-sm font-semibold">Twitter Card</h4>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-xs font-medium">Twitter Card Type</p>
          {present.twitterCard ? (
            <IconCheck className="size-3 text-green-600" />
          ) : (
            <IconX className="size-3 text-red-600" />
          )}
        </div>
        {data.twitterCard ? (
          <p className="text-xs text-muted-foreground">{data.twitterCard}</p>
        ) : (
          <p className="text-xs text-muted-foreground italic">Not found</p>
        )}
      </div>
    </div>
  );
}

