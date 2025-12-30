'use client';

import { IconX } from '@tabler/icons-react';
import React from 'react';

interface SEOMissingElementsProps {
  missing: string[];
}

export function SEOMissingElements({ missing }: SEOMissingElementsProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h4 className="text-sm font-semibold flex items-center gap-2">
        <IconX className="size-4 text-red-600" />
        Missing SEO Elements
      </h4>
      {missing.length > 0 ? (
        <div className="space-y-2">
          {missing.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <IconX className="size-4 text-red-600 shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          All essential SEO elements are present!
        </p>
      )}
    </div>
  );
}

