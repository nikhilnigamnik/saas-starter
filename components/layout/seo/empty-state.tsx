'use client';

import React from 'react';

export function SEOEmptyState() {
  return (
    <div className="p-4 bg-secondary rounded-lg text-center flex items-center justify-center flex-col min-h-[calc(100vh-200px)]">
      <p className="mb-2 text-xs">No report found</p>
      <p className="text-muted-foreground text-xs">generate a report to get started</p>
    </div>
  );
}

