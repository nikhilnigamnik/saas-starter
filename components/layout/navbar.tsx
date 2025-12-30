import Link from 'next/link';
import { Button } from '../ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex py-4 items-center justify-between px-4 border border-dotted backdrop-blur-xl bg-background/50">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-base font-semibold text-foreground">BetterSeo</span>
        </Link>

        <Button asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}
