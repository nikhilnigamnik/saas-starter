import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Cta() {
  return (
    <section>
      <div className="max-w-4xl mx-auto border-x border-b border-dotted ">
        <div className="text-center space-y-4 py-12 px-4">
          <h2 className="md:text-3xl text-xl font-medium text-foreground">
            Ready to improve your <span className="text-brand">SEO rankings?</span>
          </h2>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Join thousands of developers who are already using Saas Starter to optimize their search
            engine performance.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
