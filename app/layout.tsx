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
  title: 'Saas Starter',
  description: 'Saas Starter',
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
