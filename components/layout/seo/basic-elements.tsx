'use client';

import { IconCheck, IconX } from '@tabler/icons-react';
import React from 'react';

interface SEOBasicElementsProps {
  present: {
    title: boolean;
    metaDescription: boolean;
    metaKeywords: boolean;
    canonical: boolean;
    robots: boolean;
  };
  data: {
    title?: string;
    metaDescription?: string;
    metaKeywords?: string;
    canonical?: string;
    robots?: string;
  };
}

export function SEOBasicElements({ present, data }: SEOBasicElementsProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h4 className="text-sm font-semibold">Basic SEO Elements</h4>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Title</p>
            {present.title ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.title ? (
            <>
              <p className="text-xs text-muted-foreground wrap-break-word">{data.title}</p>
              <p className="text-xs text-muted-foreground mt-1">({data.title.length} characters)</p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Meta Description</p>
            {present.metaDescription ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.metaDescription ? (
            <>
              <p className="text-xs text-muted-foreground wrap-break-word">
                {data.metaDescription}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ({data.metaDescription.length} characters)
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Meta Keywords</p>
            {present.metaKeywords ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.metaKeywords ? (
            <p className="text-xs text-muted-foreground wrap-break-word">{data.metaKeywords}</p>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Canonical URL</p>
            {present.canonical ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.canonical ? (
            <p className="text-xs text-muted-foreground break-all">{data.canonical}</p>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">Robots Meta</p>
            {present.robots ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.robots ? (
            <p className="text-xs text-muted-foreground">{data.robots}</p>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
