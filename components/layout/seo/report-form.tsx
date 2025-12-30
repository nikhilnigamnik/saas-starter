'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconLoader } from '@tabler/icons-react';
import React from 'react';

interface SEOReportFormProps {
  url: string;
  loading: boolean;
  onUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SEOReportForm({ url, loading, onUrlChange, onSubmit }: SEOReportFormProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3>Report Summary</h3>
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <Input
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          required
          disabled={loading}
          name="url"
          type="url"
        />
        <Button type="submit" disabled={loading}>
          {loading ? <IconLoader className="size-4 animate-spin" /> : 'Generate Report'}
        </Button>
      </form>
    </div>
  );
}

