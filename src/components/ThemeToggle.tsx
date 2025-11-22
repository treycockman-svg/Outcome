'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-medium text-slate-200 shadow-lg backdrop-blur transition hover:bg-white/10 hover:text-white dark:bg-white/5 dark:hover:bg-white/15"
    >
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-400 text-[10px] dark:from-slate-900 dark:to-slate-700"
      >
        {isDark ? '🌙' : '☀️'}
      </span>
      <span>{isDark ? 'Dark' : 'Light'} mode</span>
    </button>
  );
}
