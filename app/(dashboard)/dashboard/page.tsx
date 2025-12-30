'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconLoader } from '@tabler/icons-react';
import React, { useState } from 'react';

export default function Page() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGenerateReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/report', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Failed to generate report', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3>Report Summary</h3>
        <form onSubmit={handleGenerateReport} className="flex items-center gap-2">
          <Input
            placeholder="Enter website URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
      <div className="p-4 bg-secondary rounded-lg text-center flex items-center justify-center flex-col min-h-[calc(100vh-200px)]">
        <p className="mb-2 text-xs">No report found</p>
        <p className="text-muted-foreground text-xs">generate a report to get started</p>
      </div>
    </div>
  );
}
