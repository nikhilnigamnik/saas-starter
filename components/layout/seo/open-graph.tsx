'use client';

import { IconCheck, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import React from 'react';

interface SEOOpenGraphProps {
  present: {
    ogTitle: boolean;
    ogDescription: boolean;
    ogImage: boolean;
  };
  data: {
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}

export function SEOOpenGraph({ present, data }: SEOOpenGraphProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h4 className="text-sm font-semibold">Open Graph (OG) Tags</h4>
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">OG Title</p>
            {present.ogTitle ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.ogTitle ? (
            <p className="text-xs text-muted-foreground wrap-break-word">{data.ogTitle}</p>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium">OG Description</p>
            {present.ogDescription ? (
              <IconCheck className="size-3 text-green-600" />
            ) : (
              <IconX className="size-3 text-red-600" />
            )}
          </div>
          {data.ogDescription ? (
            <p className="text-xs text-muted-foreground wrap-break-word">
              {data.ogDescription}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground italic">Not found</p>
          )}
        </div>

        {data.ogImage ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-medium">OG Image</p>
              {present.ogImage ? (
                <IconCheck className="size-3 text-green-600" />
              ) : (
                <IconX className="size-3 text-red-600" />
              )}
            </div>
            <div className="space-y-2">
              <div className="relative w-full max-w-md aspect-video overflow-hidden">
                <Image
                  src={data.ogImage}
                  alt="Open Graph Image"
                  fill
                  className="object-contain"
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground break-all">{data.ogImage}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs font-medium">OG Image</p>
              <IconX className="size-3 text-red-600" />
            </div>
            <p className="text-xs text-muted-foreground italic">Not found</p>
          </div>
        )}
      </div>
    </div>
  );
}

