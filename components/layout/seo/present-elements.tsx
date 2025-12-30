'use client';

import { IconCheck } from '@tabler/icons-react';
import React from 'react';

interface SEOPresentElementsProps {
  present: Record<string, boolean>;
}

export function SEOPresentElements({ present }: SEOPresentElementsProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h4 className="text-sm font-semibold flex items-center gap-2">
        <IconCheck className="size-4 text-green-600" />
        SEO Elements Present
      </h4>
      <div className="space-y-2">
        {Object.entries(present).map(([key, value]) => {
          if (value) {
            const label = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())
              .trim();
            return (
              <div key={key} className="flex items-center gap-2 text-xs">
                <IconCheck className="size-4 text-green-600 shrink-0" />
                <span className="text-muted-foreground">{label}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

