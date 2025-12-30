import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/provider/providers';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'BetterSeo - SEO Analysis Tool',
    template: '%s | BetterSeo',
  },
  description:
    'BetterSeo is a SEO analysis tool that helps you analyze, track, and improve your search engine rankings with powerful tools and insights that drive real results.',
  keywords: ['SEO analysis', 'SEO tracking', 'SEO improvement', 'SEO tool'],
  authors: [{ name: 'BetterSeo' }],
  creator: 'BetterSeo',
  publisher: 'BetterSeo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://better-seo.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'BetterSeo - SEO Analysis Tool',
    description:
      'BetterSeo is a SEO analysis tool that helps you analyze, track, and improve your search engine rankings with powerful tools and insights that drive real results.',
    siteName: 'BetterSeo',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'BetterSeo - SEO Analysis Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BetterSeo - SEO Analysis Tool',
    description:
      'BetterSeo is a SEO analysis tool that helps you analyze, track, and improve your search engine rankings with powerful tools and insights that drive real results.',
    creator: '@betterseo',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'BetterSeo - SEO Analysis Tool',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={` ${geistMono.variable} ${inter.className} antialiased`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
