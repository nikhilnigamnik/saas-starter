'use client';

import {
  SEOEmptyState,
  SEOMissingElements,
  SEOPresentElements,
  SEORecommendations,
  SEOReportDisplay,
  SEOReportForm,
  SEOReportHeader,
} from '@/components/layout/seo';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface SEOReport {
  url: string;
  present: {
    title: boolean;
    metaDescription: boolean;
    metaKeywords: boolean;
    ogTitle: boolean;
    ogDescription: boolean;
    ogImage: boolean;
    twitterCard: boolean;
    canonical: boolean;
    robots: boolean;
    h1: boolean;
    h2: boolean;
    lang: boolean;
    viewport: boolean;
    structuredData: boolean;
  };
  data: {
    title?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    canonical?: string;
    robots?: string;
    h1Count: number;
    h2Count: number;
    lang?: string;
    viewport?: string;
    imagesWithoutAlt: number;
    totalImages: number;
  };
  missing: string[];
  recommendations: string[];
}

export default function Page() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<SEOReport | null>(null);

  async function handleGenerateReport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 'Failed to generate report';

        if (response.status === 402) {
          toast.error(errorMessage);
        } else {
          toast.error(errorMessage);
        }
        return;
      }

      const data = await response.json();
      console.log(data);
      setReport(data);
    } catch (error) {
      console.error('Failed to generate report', error);
      toast.error('Error', {
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <SEOReportForm
        url={url}
        loading={loading}
        onUrlChange={setUrl}
        onSubmit={handleGenerateReport}
      />
      {report ? (
        <div className="space-y-4 pb-4">
          <SEOReportHeader
            url={report.url}
            onClear={() => {
              setReport(null);
              setUrl('');
            }}
          />
          <SEOPresentElements present={report.present} />
          <SEOMissingElements missing={report.missing} />
          <SEORecommendations recommendations={report.recommendations} />
          <SEOReportDisplay report={report} />
        </div>
      ) : (
        <SEOEmptyState />
      )}
    </div>
  );
}
