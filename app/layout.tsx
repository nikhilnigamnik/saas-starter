import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/provider/providers';
import { Toaster } from 'sonner';

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
    default: 'Saas Starter - SEO Analysis Tool',
    template: '%s | SaaS Starter',
  },
  description:
    'Saas Starter is a SEO analysis tool that helps you analyze, track, and improve your search engine rankings with powerful tools and insights that drive real results.',
  keywords: ['SEO analysis', 'SEO tracking', 'SEO improvement', 'SEO tool'],
  authors: [{ name: 'Saas Starter' }],
  creator: 'Saas Starter',
  publisher: 'Saas Starter',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saas-starter.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Saas Starter - SEO Analysis Tool',
    description:
      'Saas Starter is a SEO analysis tool that helps you analyze, track, and improve your search engine rankings with powerful tools and insights that drive real results.',
    siteName: 'Saas Starter',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Saas Starter - SEO Analysis Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saas Starter - SEO Analysis Tool',
    description:
      'Saas Starter is a SEO analysis tool that helps you analyze, track, and improve your search engine rankings with powerful tools and insights that drive real results.',
    creator: '@saasstarter',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Saas Starter - SEO Analysis Tool',
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
        <Toaster closeButton />
      </body>
    </html>
  );
}
