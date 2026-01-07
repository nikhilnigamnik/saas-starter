'use client';

import { IconSunFilled, IconMoonFilled, IconDeviceDesktop } from '@tabler/icons-react';
import { useTheme } from 'next-themes';

export function Themetoggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center p-0.5 rounded-full gap-1 bg-secondary w-fit">
      <button
        onClick={() => setTheme('dark')}
        className={`cursor-pointer p-1.5 rounded-full ${
          theme === 'dark' ? 'text-primary bg-card' : 'text-foreground'
        }`}
      >
        <IconMoonFilled size={14} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`cursor-pointer p-1.5 rounded-full ${
          theme === 'system' ? 'text-primary bg-card' : 'text-foreground'
        }`}
      >
        <IconDeviceDesktop size={14} />
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`cursor-pointer p-1.5 rounded-full ${
          theme === 'light' ? 'text-primary bg-card' : 'text-foreground'
        }`}
      >
        <IconSunFilled size={14} />
      </button>
    </div>
  );
}
