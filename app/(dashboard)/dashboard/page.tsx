import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

export default function page() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3>Report Summary</h3>
        <div className="flex items-center gap-2">
          <Input placeholder="Enter website URL" />
          <Button>Generate Report</Button>
        </div>
      </div>
      <div className="p-4 bg-secondary rounded-lg text-center flex items-center justify-center flex-col min-h-[calc(100vh-200px)]">
        <p className="mb-2 text-xs">No report found</p>
        <p className="text-muted-foreground text-xs">generate a report to get started</p>
      </div>
    </div>
  );
}
