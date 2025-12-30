import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Hero() {
  return (
    <section>
      <div className="max-w-4xl mx-auto border-x border-b border-dotted">
        <div className="text-center space-y-4 py-12 px-4">
          <h1 className="md:text-4xl text-2xl font-medium text-foreground leading-tight max-w-xl mx-auto">
            Built for developers <span className="text-brand">who care about SEO</span>
          </h1>

          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            BetterSeo helps you analyze, track, and improve your search engine rankings with
            powerful tools and insights that drive real results.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          <div className="pt-12 flex items-center justify-center gap-8 text-xs text-muted-foreground">
            <div className="text-center">
              <div className="text-lg font-medium text-foreground">10K+</div>
              <div>Active Users</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-lg font-medium text-foreground">50K+</div>
              <div>Keywords Tracked</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-lg font-medium text-foreground">99.9%</div>
              <div>Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
