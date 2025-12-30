'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

interface SEOReportHeaderProps {
  url: string;
  onClear: () => void;
}

export function SEOReportHeader({ url, onClear }: SEOReportHeaderProps) {
  return (
    <div className="border rounded-lg p-4 bg-secondary">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold mb-1">Website URL</h4>
          <p className="text-xs text-muted-foreground break-all">{url}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}

