'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Signout } from '../ui/signout';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/settings', label: 'Settings' },
  { href: '/billing', label: 'Billing' },
] as const;

export function DashboardNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname.startsWith('/dashboard/');
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className=" py-2 flex items-center justify-between gap-1"
      aria-label="Dashboard navigation"
    >
      <div className="flex items-center gap-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-xs font-medium px-3 py-1.5 rounded-md',
                active
                  ? 'text-foreground bg-secondary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary active:bg-card',
              )}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <Signout />
    </nav>
  );
}
