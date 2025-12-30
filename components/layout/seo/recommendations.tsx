'use client';

import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';

interface SEORecommendationsProps {
  recommendations: string[];
}

export function SEORecommendations({ recommendations }: SEORecommendationsProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h4 className="text-sm font-semibold flex items-center gap-2">
        <IconAlertCircle className="size-4 text-yellow-600" />
        Recommendations
      </h4>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start gap-2 text-xs">
            <IconAlertCircle className="size-4 text-yellow-600 shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
