'use client';

import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

interface SEOTechnicalProps {
  present: {
    lang: boolean;
    viewport: boolean;
    structuredData: boolean;
  };
  data: {
    lang?: string;
    viewport?: string;
  };
}

export function SEOTechnical({ present, data }: SEOTechnicalProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h4 className="text-sm font-semibold">Technical SEO</h4>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">HTML Language</p>
            {present.lang ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.lang ? (
            <p className="text-xs text-muted-foreground">{data.lang}</p>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Viewport</p>
            {present.viewport ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.viewport ? (
            <p className="text-xs text-muted-foreground">{data.viewport}</p>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Structured Data (JSON-LD)</p>
            {present.structuredData ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {present.structuredData ? 'Present' : 'Not found'}
          </p>
        </div>
      </div>
    </div>
  );
}

