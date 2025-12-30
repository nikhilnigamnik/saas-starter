'use client';

import React from 'react';
import { SEOBasicElements } from './basic-elements';
import { SEOContentAnalysis } from './content-analysis';
import { SEOOpenGraph } from './open-graph';
import { SEOTechnical } from './technical';
import { SEOTwitterCard } from './twitter-card';

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

interface SEOReportDisplayProps {
  report: SEOReport;
}

export function SEOReportDisplay({ report }: SEOReportDisplayProps) {
  return (
    <div className="space-y-4">
      <SEOBasicElements
        present={{
          title: report.present.title,
          metaDescription: report.present.metaDescription,
          metaKeywords: report.present.metaKeywords,
          canonical: report.present.canonical,
          robots: report.present.robots,
        }}
        data={{
          title: report.data.title,
          metaDescription: report.data.metaDescription,
          metaKeywords: report.data.metaKeywords,
          canonical: report.data.canonical,
          robots: report.data.robots,
        }}
      />
      <SEOOpenGraph
        present={{
          ogTitle: report.present.ogTitle,
          ogDescription: report.present.ogDescription,
          ogImage: report.present.ogImage,
        }}
        data={{
          ogTitle: report.data.ogTitle,
          ogDescription: report.data.ogDescription,
          ogImage: report.data.ogImage,
        }}
      />
      <SEOTwitterCard
        present={{ twitterCard: report.present.twitterCard }}
        data={{ twitterCard: report.data.twitterCard }}
      />
      <SEOTechnical
        present={{
          lang: report.present.lang,
          viewport: report.present.viewport,
          structuredData: report.present.structuredData,
        }}
        data={{
          lang: report.data.lang,
          viewport: report.data.viewport,
        }}
      />
      <SEOContentAnalysis
        present={{
          h1: report.present.h1,
          h2: report.present.h2,
        }}
        data={{
          h1Count: report.data.h1Count,
          h2Count: report.data.h2Count,
          totalImages: report.data.totalImages,
          imagesWithoutAlt: report.data.imagesWithoutAlt,
        }}
      />
    </div>
  );
}
