'use client';

import { IconAlertCircle, IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

interface SEOContentAnalysisProps {
  present: {
    h1: boolean;
    h2: boolean;
  };
  data: {
    h1Count: number;
    h2Count: number;
    totalImages: number;
    imagesWithoutAlt: number;
  };
}

export function SEOContentAnalysis({ present, data }: SEOContentAnalysisProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h4 className="text-sm font-semibold">Content Analysis</h4>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Headings</p>
            {present.h1 && present.h2 ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            H1: {data.h1Count} {present.h1 ? '✓' : '✗'} | H2: {data.h2Count}{' '}
            {present.h2 ? '✓' : '✗'}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Images</p>
            {data.totalImages > 0 && data.imagesWithoutAlt === 0 ? (
              <IconCheck className="size-3 text-green-600" />
            ) : data.totalImages > 0 ? (
              <IconAlertCircle className="size-3 text-yellow-600" />
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            Total: {data.totalImages} | Missing Alt: {data.imagesWithoutAlt}
          </p>
        </div>
      </div>
    </div>
  );
}

