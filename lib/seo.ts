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

export const analyzeSEO = (html: string, url: string): SEOReport => {
  const report: SEOReport = {
    url,
    present: {
      title: false,
      metaDescription: false,
      metaKeywords: false,
      ogTitle: false,
      ogDescription: false,
      ogImage: false,
      twitterCard: false,
      canonical: false,
      robots: false,
      h1: false,
      h2: false,
      lang: false,
      viewport: false,
      structuredData: false,
    },
    data: {
      h1Count: 0,
      h2Count: 0,
      imagesWithoutAlt: 0,
      totalImages: 0,
    },
    missing: [],
    recommendations: [],
  };

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    report.present.title = true;
    report.data.title = titleMatch[1].trim();
    if (report.data.title.length < 30 || report.data.title.length > 60) {
      report.recommendations.push(
        `Title should be 30-60 characters (currently ${report.data.title.length})`,
      );
    }
  } else {
    report.missing.push('Title tag');
  }

  // Extract meta description
  const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (metaDescMatch) {
    report.present.metaDescription = true;
    report.data.metaDescription = metaDescMatch[1].trim();
    if (report.data.metaDescription.length < 120 || report.data.metaDescription.length > 160) {
      report.recommendations.push(
        `Meta description should be 120-160 characters (currently ${report.data.metaDescription.length})`,
      );
    }
  } else {
    report.missing.push('Meta description');
  }

  // Extract meta keywords
  const metaKeywordsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
  if (metaKeywordsMatch) {
    report.present.metaKeywords = true;
    report.data.metaKeywords = metaKeywordsMatch[1].trim();
  } else {
    report.missing.push('Meta keywords');
  }

  // Extract Open Graph tags
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  if (ogTitleMatch) {
    report.present.ogTitle = true;
    report.data.ogTitle = ogTitleMatch[1].trim();
  } else {
    report.missing.push('Open Graph title');
  }

  const ogDescMatch = html.match(
    /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i,
  );
  if (ogDescMatch) {
    report.present.ogDescription = true;
    report.data.ogDescription = ogDescMatch[1].trim();
  } else {
    report.missing.push('Open Graph description');
  }

  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogImageMatch) {
    report.present.ogImage = true;
    report.data.ogImage = ogImageMatch[1].trim();
  } else {
    report.missing.push('Open Graph image');
  }

  // Extract Twitter Card
  const twitterCardMatch = html.match(
    /<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i,
  );
  if (twitterCardMatch) {
    report.present.twitterCard = true;
    report.data.twitterCard = twitterCardMatch[1].trim();
  } else {
    report.missing.push('Twitter Card');
  }

  // Extract canonical URL
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (canonicalMatch) {
    report.present.canonical = true;
    report.data.canonical = canonicalMatch[1].trim();
  } else {
    report.missing.push('Canonical URL');
  }

  // Extract robots meta
  const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  if (robotsMatch) {
    report.present.robots = true;
    report.data.robots = robotsMatch[1].trim();
  }

  // Extract H1 tags
  const h1Matches = html.match(/<h1[^>]*>([^<]+)<\/h1>/gi);
  if (h1Matches) {
    report.present.h1 = true;
    report.data.h1Count = h1Matches.length;
    if (h1Matches.length > 1) {
      report.recommendations.push(
        `Multiple H1 tags found (${h1Matches.length}). Use only one H1 per page.`,
      );
    }
  } else {
    report.missing.push('H1 heading');
  }

  // Extract H2 tags
  const h2Matches = html.match(/<h2[^>]*>([^<]+)<\/h2>/gi);
  if (h2Matches) {
    report.present.h2 = true;
    report.data.h2Count = h2Matches.length;
  }

  // Extract language
  const langMatch = html.match(/<html[^>]*\s+lang=["']([^"']+)["']/i);
  if (langMatch) {
    report.present.lang = true;
    report.data.lang = langMatch[1].trim();
  } else {
    report.missing.push('HTML lang attribute');
  }

  // Extract viewport
  const viewportMatch = html.match(/<meta\s+name=["']viewport["']\s+content=["']([^"']+)["']/i);
  if (viewportMatch) {
    report.present.viewport = true;
    report.data.viewport = viewportMatch[1].trim();
  } else {
    report.missing.push('Viewport meta tag');
  }

  // Extract structured data (JSON-LD)
  const structuredDataMatch = html.match(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
  );
  if (structuredDataMatch) {
    report.present.structuredData = true;
  } else {
    report.missing.push('Structured data (JSON-LD)');
  }

  // Analyze images
  const imageMatches = html.match(/<img[^>]*>/gi);
  if (imageMatches) {
    report.data.totalImages = imageMatches.length;
    imageMatches.forEach((img) => {
      if (!/alt=["'][^"']*["']/i.test(img)) {
        report.data.imagesWithoutAlt++;
      }
    });
    if (report.data.imagesWithoutAlt > 0) {
      report.recommendations.push(`${report.data.imagesWithoutAlt} image(s) missing alt text`);
    }
  }

  return report;
}
